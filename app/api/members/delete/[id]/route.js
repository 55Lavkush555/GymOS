import connectDB from "@/lib/db";
import Member from "@/models/Member";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const user = await currentUser();
        const { id } = await params;

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }

        await Member.deleteOne({ ownerClerkId: user.id, _id: id });


        return NextResponse.json({ success: true, message: "Member deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting member:", error);
        return NextResponse.json({ success: false, message: "Error deleting member" }, { status: 500 });
    }
}