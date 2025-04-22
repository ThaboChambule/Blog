import { NextRequest, NextResponse } from "next/server";

// Mock user data
const mockUsers = [
  {
    id: "101",
    username: "johndoe",
    password: "password123",
  },
  {
    id: "102",
    username: "janedoe",
    password: "password123",
  },
];

export async function POST(request: NextRequest) {
  try {
    // Add a small delay to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 300));

    const { username, password } = await request.json();

    // Find user by username
    const user = mockUsers.find((u) => u.username === username);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create a mock token - in a real app, this would be a JWT
    const token = `mock-token-${Date.now()}`;

    // Create the response with user data (excluding password)
    const response = NextResponse.json({
      id: user.id,
      username: user.username,
    });

    // Set a mock token cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
