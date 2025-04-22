import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ljsdljfsfslfsfslfsnfsnl';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { username, password } = await request.json();
    
    // Find user by username
    const userDoc = await User.findOne({ username });
    
    // Check if user exists
    if (!userDoc) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await userDoc.comparePassword(password);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: userDoc._id, username: userDoc.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Create the response
    const response = NextResponse.json({
      id: userDoc._id,
      username: userDoc.username
    });
    
    // Set the token as an HTTP-only cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
      path: '/'
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}