import connectDB from "@/lib/db";
import Member from "@/models/Member";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const user = await currentUser();
        const { id } = await params;
        const body = await req.json();

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }

        await Member.updateOne({ ownerClerkId: user.id, _id: id }, { $set: body });

        return NextResponse.json({ success: true, message: "Member updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating member:", error);
        return NextResponse.json({ success: false, message: "Error updating member" }, { status: 500 });
    }
}
