import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(request) {
    try {
        await connectDB();
        const user = await currentUser();
        const body = await request.json();

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        if (user?.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        await User.findOneAndUpdate({ _id: body._id }, { planEndDate: body.planEndDate });

        return NextResponse.json({ success: true, message: "Admin updated successfully", body }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error updating admin" }, { status: 500 });
    }
}