import { NextResponse } from "next/server";

export async function POST() {
  // Add a small delay to simulate network request
  await new Promise((resolve) => setTimeout(resolve, 100));

  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear the token cookie
  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  return response;
}
