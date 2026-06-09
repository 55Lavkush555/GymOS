import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Member from "@/models/Member";
import Attendance from "@/models/Attendence";
import User from "@/models/User";

export async function GET() {
    try {
        await connectDB();

        const users = await User.find({});

        for (const user of users) {
            let members = await Member.find({ ownerClerkId: user.clerkId });
            for (const member of members) {
                await Attendance.create({ memberId: member._id, ownerClerkId: user.clerkId });
            }
        }


        return NextResponse.json({ success: true, message: "Connected to Database" })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
    }
}