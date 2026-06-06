import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Member from "@/models/Member";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
    try {
        await connectDB();

        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const url = new URL(req.url);

        const limit = Number(url.searchParams.get("limit")) || 10;
        const page = Number(url.searchParams.get("page")) || 1;
        const filter = url.searchParams.get("filter") || "";
        const search = decodeURIComponent(url.searchParams.get("search") || "");

        const now = new Date();

        const fourDaysLater = new Date();
        fourDaysLater.setDate(fourDaysLater.getDate() + 4);

        let query = {
            ownerClerkId: user.id,
        };

        // Filtering
        if (filter === "expired") {
            query.expiryDate = {
                $lt: now,
            };
        } else if (filter === "expiring_soon") {
            query.expiryDate = {
                $gte: now,
                $lte: fourDaysLater,
            };
        } else if (filter === "active") {
            query.expiryDate = {
                $gt: fourDaysLater,
            };
        }

        // Search
        if (search.trim()) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        const totalMembers = await Member.countDocuments(query);

        const totalPages = Math.ceil(totalMembers / limit);

        let members = await Member.find(query)
            .sort({ _id: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .lean();

        members = members.map((member) => {
            let status = "active";

            if (now > new Date(member.expiryDate)) {
                status = "expired";
            } else if (
                new Date(member.expiryDate) <= fourDaysLater
            ) {
                status = "expiring_soon";
            }

            return {
                ...member,
                status,
            };
        });

        return NextResponse.json(
            {
                success: true,
                message: "Members fetched successfully",
                members,
                totalMembers,
                totalPages,
                currentPage: page,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}