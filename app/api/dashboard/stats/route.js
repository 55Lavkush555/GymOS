import connectDB from "@/lib/db";
import Member from "@/models/Member";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        
        const now = new Date();
        
        const fourDaysLater = new Date();
        fourDaysLater.setDate(fourDaysLater.getDate() + 4);
        
        let query = {
            ownerClerkId: user.id,
        };
        
        const totalMembers = await Member.find({ ...query }).countDocuments();
        const expiredMembers = await Member.find({ ...query, expiryDate: { $lt: now } }).countDocuments();
        const expiringSoonMembers = await Member.find({ ...query, expiryDate: { $gte: now, $lte: fourDaysLater } }).countDocuments();
        const activeMembers = await Member.find({ ...query, expiryDate: { $gt: fourDaysLater } }).countDocuments();

        return NextResponse.json({ success: true, message: "Members fetched successfully", totalMembers, expiredMembers, expiringSoonMembers, activeMembers }, { status: 200 });
    } catch (error) {
        console.error("Error fetching members:", error);
        return NextResponse.json({ success: false, message: "Error fetching members" }, { status: 500 });
    }
}