import connectDB from "@/lib/db";
import Attendance from "@/models/Attendence";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const attendanceData = await Attendance.find({ ownerClerkId: user.id }).populate("memberId", "name");

        const today = new Date();

        const attendance = attendanceData.map((member) => {
            const isPresent = member.attendanceRecords.some((record) => {
                const date = new Date(record);

                return (
                    date.getDate() === today.getDate() &&
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear()
                );
            });

            return {
                ...member.toObject(),
                attendanceStatus: isPresent ? "present" : "not_marked",
            };
        });


        return NextResponse.json({ success: true, message: "Attendance data fetched successfully", attendance }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}