import connectDB from "@/lib/db";
import Member from "@/models/Member";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import User from "@/models/User";

export async function GET() {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const now = new Date();
        const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        );

        const endOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );

        const result = await Member.aggregate([
            {
                $match: {
                    ownerClerkId: user.id,
                    startDate: {
                        $gte: startOfMonth,
                        $lt: endOfMonth,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$amountPaid",
                    },
                    totalMembers: {
                        $sum: 1,
                    },
                },
            },
        ]);

        const revenue = result[0]?.totalRevenue || 0;
        const members = result[0]?.totalMembers || 0;

        const userData = await User.findOne({ clerkId: user.id });

        const graphData = Array.from(
            userData.pastData.entries()
        ).map(([month, data]) => ({
            month,
            revenue: data.revenue,
            members: data.members,
        }));

        const currentMonthData = {
            month: currentMonthKey,
            revenue,
            members,
        };

        graphData.push(currentMonthData);


        return NextResponse.json({ success: true, message: "Revenue fetched successfully", revenue, members, graphData }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "internal server error" }, { status: 500 });
    }
}