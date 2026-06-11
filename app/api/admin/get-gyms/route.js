import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
    try {
        await connectDB();
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        if (user?.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        
        const gyms = await User.find();

        return NextResponse.json({ success: true, message: "Gyms fetched successfully", gyms }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error fetching gyms" }, { status: 500 });
    }
}