import connectDB from "@/lib/db";
import Member from "@/models/Member";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import User from "@/models/User";
import { getIstDateKey, getIstMonthBounds, getIstMonthKey } from "@/lib/date";

async function getPastData(user) {
    const now = new Date();
    const currentMonthKey = getIstMonthKey(now);
    const { start: startOfMonth, end: endOfMonth } = getIstMonthBounds(now);

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

    return { revenue, members, graphData };
}


async function getStats(user) {
    const todayKey = getIstDateKey(new Date());
    const fourDaysLaterKey = getIstDateKey(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000));

    const members = await Member.find({ ownerClerkId: user.id }).lean();

    const totalMembers = members.length;
    const expiredMembers = members.filter((member) => {
        const expiryKey = getIstDateKey(member.expiryDate);
        return expiryKey && expiryKey < todayKey;
    }).length;
    const expiringSoonMembers = members.filter((member) => {
        const expiryKey = getIstDateKey(member.expiryDate);
        return expiryKey && expiryKey >= todayKey && expiryKey <= fourDaysLaterKey;
    }).length;
    const activeMembers = members.filter((member) => {
        const expiryKey = getIstDateKey(member.expiryDate);
        return expiryKey && expiryKey > fourDaysLaterKey;
    }).length;

    return { totalMembers, expiredMembers, expiringSoonMembers, activeMembers };
}


async function getActiveMembers(user) {
    const fourDaysLaterKey = getIstDateKey(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000));

    const members = await Member.find({ ownerClerkId: user.id }).sort({ _id: -1 }).lean();

    return members
        .filter((member) => {
            const expiryKey = getIstDateKey(member.expiryDate);
            return expiryKey && expiryKey > fourDaysLaterKey;
        })
        .slice(0, 5);
}

async function getExpiringMembers(user) {
    const todayKey = getIstDateKey(new Date());
    const fourDaysLaterKey = getIstDateKey(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000));

    const members = await Member.find({ ownerClerkId: user.id }).sort({ _id: -1 }).lean();

    return members
        .filter((member) => {
            const expiryKey = getIstDateKey(member.expiryDate);
            return expiryKey && expiryKey >= todayKey && expiryKey <= fourDaysLaterKey;
        })
        .slice(0, 5);
}


export async function GET() {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { revenue, members, graphData } = await getPastData(user);

        const { totalMembers, expiredMembers, expiringSoonMembers, activeMembers } = await getStats(user);

        const fiveActiveMembers = await getActiveMembers(user);

        const fiveExpiringMembers = await getExpiringMembers(user);

        return NextResponse.json({ success: true, message: "Dashboard data fetched successfully", revenue, members, graphData, totalMembers, expiredMembers, expiringSoonMembers, activeMembers, fiveActiveMembers, fiveExpiringMembers }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: "internal server error" }, { status: 500 });
    }
}