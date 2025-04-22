import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Add a small delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Get the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // In a real app, we would validate the token and retrieve user data
    // For mock purposes, we'll just return hardcoded user data
    // This simulates an authenticated user
    return NextResponse.json({
      id: "101",
      username: "johndoe",
    });
  } catch (error) {
    console.error("Profile verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
