import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Attendance from "@/models/Attendence";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request, { params }) {
    try {
        await connectDB();

        const user = await currentUser();
        const { memberId } = await params;

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }


        const attendance = await Attendance.findOne({
            memberId,
            ownerClerkId: user.id
        });


        if (!attendance) {
            return NextResponse.json(
                { success: false, message: "Attendance not found" },
                { status: 404 }
            );
        }


        const today = new Date();


        // 90 days old date
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);


        // old records remove
        attendance.attendanceRecords =
            attendance.attendanceRecords.filter(
                (record) => new Date(record) >= ninetyDaysAgo
            );


        // add today's attendance
        attendance.attendanceRecords.push(today);


        // increase total visits
        attendance.totalVisits += 1;


        await attendance.save();


        return NextResponse.json(
            {
                success: true,
                message: "Attendance marked as present",
                attendance
            },
            {
                status: 200
            }
        );


    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {
                status: 500
            }
        );
    }
}