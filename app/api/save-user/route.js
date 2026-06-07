import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
    try {
        await connectDB();
        const user = await currentUser()

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }

        const userData = {
            clerkId: user.id,
            name: user.fullName,
            email: user.emailAddresses[0].emailAddress,
            planEndDate: new Date(new Date().setDate(new Date().getDate() + 7)),
            revenueHistory: {}
        }

        if (await User.findOne({ clerkId: user.id })) {
            return NextResponse.json({ success: true, message: "User already exists" }, { status: 200})
        }

        const newUser = await User.create(userData)

        return NextResponse.json({ success: true, message: "User saved successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error saving user:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}