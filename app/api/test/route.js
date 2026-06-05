import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET() {
    try {
        await connectDB();

        let users = await User.find();

        return NextResponse.json({ success: true, message: "Connected to Database", users })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
    }
}