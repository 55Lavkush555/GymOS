import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Member from "@/models/Member";
import { getIstMonthBounds, getIstMonthKey } from "@/lib/date";

export async function GET(req) {

    const authHeader = req.headers.get("authorization");

    if (
        authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }


    try {
        await connectDB();

        const users = await User.find({});

        const snapshotDate = new Date();
        snapshotDate.setDate(1);
        snapshotDate.setMonth(snapshotDate.getMonth() - 1);

        const MonthKey = getIstMonthKey(snapshotDate);
        const { start: startOfMonth, end: endOfMonth } = getIstMonthBounds(snapshotDate);

        for (const user of users) {
            const result = await Member.aggregate([
                {
                    $match: {
                        ownerClerkId: user.clerkId,
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

            user.pastData.set(MonthKey, {
                revenue,
                members,
            });

            await user.save();

            const entries = Array.from(user.pastData.entries());

            entries.sort(([a], [b]) => a.localeCompare(b));

            while (entries.length > 12) {
                entries.shift();
            }

            user.pastData = new Map(entries);

            await user.save();
        }

        return NextResponse.json({ success: true, message: "Data saved successfully" });
    }
    catch (err) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}