import connectDB from "@/lib/db";
import Member from "@/models/Member";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import User from "@/models/User";

async function getPastData(user) {
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

    return { revenue, members, graphData };
}


async function getStats(user) {
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

    return { totalMembers, expiredMembers, expiringSoonMembers, activeMembers };
}


async function getActiveMembers(user) {
    const fourDaysLater = new Date();
    fourDaysLater.setDate(fourDaysLater.getDate() + 4);

    let query = {
        ownerClerkId: user.id,
        expiryDate: {
            $gt: fourDaysLater,
        }
    };

    let acitveMembers = await Member.find(query)
        .sort({ _id: -1 })
        .limit(5)

    return acitveMembers
}

async function getExpiringMembers(user) {
    const now = new Date();

    const fourDaysLater = new Date();
    fourDaysLater.setDate(fourDaysLater.getDate() + 4);

    let query = {
        ownerClerkId: user.id,
        expiryDate: {
            $gte: now,
            $lte: fourDaysLater,
        }
    };

    let expiringMembers = await Member.find(query)
        .sort({ _id: -1 })
        .limit(5)

    return expiringMembers;
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