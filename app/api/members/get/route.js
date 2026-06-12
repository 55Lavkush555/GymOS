import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Member from "@/models/Member";
import { currentUser } from "@clerk/nextjs/server";
import { getIstDateKey } from "@/lib/date";

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

        const todayKey = getIstDateKey(new Date());
        const fourDaysLaterKey = getIstDateKey(new Date(Date.now() + 4 * 24 * 60 * 60 * 1000));

        let query = {
            ownerClerkId: user.id,
        };

        // Search
        if (search.trim()) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { phone: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        let members = await Member.find(query)
            .sort({ _id: -1 })
            .lean();

        members = members.map((member) => {
            let status = "active";
            const expiryKey = getIstDateKey(member.expiryDate);

            if (expiryKey && expiryKey < todayKey) {
                status = "expired";
            } else if (expiryKey && expiryKey <= fourDaysLaterKey) {
                status = "expiring_soon";
            }

            return {
                ...member,
                status,
            };
        });

        if (filter === "expired") {
            members = members.filter((member) => member.status === "expired");
        } else if (filter === "expiring_soon") {
            members = members.filter((member) => member.status === "expiring_soon");
        } else if (filter === "active") {
            members = members.filter((member) => member.status === "active");
        }

        const totalMembers = members.length;
        const totalPages = Math.ceil(totalMembers / limit);
        const paginatedMembers = members.slice((page - 1) * limit, page * limit);

        return NextResponse.json(
            {
                success: true,
                message: "Members fetched successfully",
                members: paginatedMembers,
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