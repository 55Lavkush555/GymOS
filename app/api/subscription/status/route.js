import connectDB from "@/lib/db";
import User from "@/models/User";
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

        const userData = await User.findOne({ clerkId: user.id });

        const planEndDate = userData.planEndDate;

        const todayKey = getIstDateKey(new Date());
        const planEndKey = getIstDateKey(planEndDate);
        const isExpired = planEndKey ? todayKey > planEndKey : false;

        return NextResponse.json({ success: true, message: "Settings fetched successfully", planEndDate, isExpired }, { status: 200 });
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ success: false, message: "Error fetching settings" }, { status: 500 });
    }
}