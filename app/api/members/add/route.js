import connectDB from "@/lib/db";
import Member from "@/models/Member";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
    try {
        await connectDB();
        const user = await currentUser();
        const body = await req.json();

        if (!user) {
            return NextResponse.json({success: false, message: "Unauthorized"})
        }
        console.log(typeof body);

        const {
            name,
            email,
            phone,
            startDate,
            expiryDate,
            age,
            gender,
            address,
            notes
        } = body

        if (!name || !email || !phone || !startDate || !expiryDate) {
            return NextResponse.json({success: false, message: "Missing required fields"})
        }

        const newMember = Member.create({
            ownerClerkId: user.id,
            name,
            email,
            phone,
            startDate,
            expiryDate,
            age, 
            gender,
            address,
            notes
        })

        return NextResponse.json({success: true, message: "Member added successfully"})

    } catch (error) {
        return NextResponse.json({success: false, message: error.message})
    }
}