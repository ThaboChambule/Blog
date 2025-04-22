import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Post from "@/models/Post";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ljsdljfsfslfsfslfsnfsnl";

// Get all posts
export async function GET() {
  try {
    await connectToDatabase();

    // Fetch posts sorted by creation date (newest first)
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// Create a new post
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify user from token
    const userData = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
    };

    // Parse request body
    const { title, summary, content, cover } = await request.json();

    // Validate required fields
    if (!title || !summary || !content) {
      return NextResponse.json(
        { error: "Title, summary, and content are required" },
        { status: 400 }
      );
    }

    // Create new post
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover,
      author: userData.id,
    });

    return NextResponse.json(postDoc, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
