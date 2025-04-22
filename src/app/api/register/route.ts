import { NextRequest, NextResponse } from "next/server";

// Mock user data - same array referenced in login route
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
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Check if username exists
    if (mockUsers.some((user) => user.username === username)) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    // Create new user - in a real app, we would save to database
    const newUser = {
      id: `${Date.now()}`, // Generate a unique ID
      username,
      password,
    };

    // In a real app, we would add this user to the database
    // mockUsers.push(newUser); // We're not actually modifying the mock data

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
