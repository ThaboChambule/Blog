import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Post from "@/models/Post";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ljsdljfsfslfsfslfsnfsnl";

// Get a specific post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    const post = await Post.findById(id).populate("author", ["username"]);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// Update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

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

    // Find the post
    const postDoc = await Post.findById(id);

    if (!postDoc) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user is the author of the post
    const isAuthor = postDoc.author.toString() === userData.id;

    if (!isAuthor) {
      return NextResponse.json(
        { error: "You are not authorized to edit this post" },
        { status: 403 }
      );
    }

    // Parse request body
    const { title, summary, content, cover } = await request.json();

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, summary, content, cover },
      { new: true }
    ).populate("author", ["username"]);

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// Delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

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

    // Find the post
    const postDoc = await Post.findById(id);

    if (!postDoc) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if user is the author of the post
    const isAuthor = postDoc.author.toString() === userData.id;

    if (!isAuthor) {
      return NextResponse.json(
        { error: "You are not authorized to delete this post" },
        { status: 403 }
      );
    }

    // Delete the post
    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
