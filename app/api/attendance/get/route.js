import connectDB from "@/lib/db";
import Attendance from "@/models/Attendance";
import "@/models/Member";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getIstDateKey } from "@/lib/date";

export async function GET() {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const attendanceData = await Attendance.find({ ownerClerkId: user.id }).populate("memberId", "name");

        const todayKey = getIstDateKey(new Date());

        const attendance = attendanceData.map((member) => {
            const isPresent = member.attendanceRecords.some((record) => {
                return getIstDateKey(record) === todayKey;
            });

            return {
                ...member.toObject(),
                attendanceStatus: isPresent ? "present" : "not_marked",
            };
        });


        return NextResponse.json({ success: true, message: "Attendance data fetched successfully", attendance }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 });
    }
}