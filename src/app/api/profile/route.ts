import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ljsdljfsfslfsfslfsnfsnl";

export async function GET(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify the token
    const userData = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
    };

    return NextResponse.json({
      id: userData.id,
      username: userData.username,
    });
  } catch (error) {
    console.error("Profile verification error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
