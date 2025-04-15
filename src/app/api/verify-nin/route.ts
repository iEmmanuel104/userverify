import { NextResponse } from "next/server";
import { getUserByNIN } from "../../../lib/db";

export async function POST(request: Request) {
    try {
        const { nin } = await request.json()

        // Validate NIN format
        if (!nin || !/^\d{11}$/.test(nin)) {
            return NextResponse.json({ success: false, message: "Invalid NIN format. Must be 11 digits." }, { status: 400 })
        }

        // Add a small delay to simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Check if user exists in our mock database
        const user = getUserByNIN(nin)

        if (!user) {
            return NextResponse.json({ success: false, message: "No user found with this NIN." }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            user,
        })
    } catch (error) {
        console.error("Error verifying NIN:", error)
        return NextResponse.json({ success: false, message: "An error occurred while verifying NIN." }, { status: 500 })
    }
}
