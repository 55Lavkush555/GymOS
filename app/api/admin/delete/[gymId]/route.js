import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import Attendance from "@/models/Attendance";
import Member from "@/models/Member";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const user = await currentUser();
        const { gymId } = await params;

        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        if (user?.emailAddresses[0].emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const gym = await User.findById(gymId);
        if (!gym) {
            return NextResponse.json({ success: false, message: "Gym not found" }, { status: 404 });
        }

        await User.findByIdAndDelete(gymId);
        await Member.deleteMany({ownerClerkId: gym.clerkId});
        await Attendance.deleteMany({ownerClerkId: gym.clerkId});

        
        return NextResponse.json({ success: true, message: "Gym deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error deleting gym" }, { status: 500 });
    }
}