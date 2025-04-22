import { NextRequest, NextResponse } from 'next/server';

// Mock posts data - should be the same as in the main posts route
const mockPosts = [
  {
    _id: '1',
    title: 'Getting Started with Next.js',
    summary: 'Learn the basics of Next.js and build your first application',
    content: '<p>Next.js is a React framework that enables server-side rendering, static site generation, and more. This post will walk you through creating your first Next.js application.</p><h2>Installation</h2><p>To get started, create a new Next.js app using:</p><pre><code>npx create-next-app@latest my-app</code></pre><p>Follow the prompts and you will have a new Next.js project ready to go!</p>',
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    author: {
      _id: '101',
      username: 'johndoe'
    },
    createdAt: '2025-04-10T10:00:00.000Z',
    updatedAt: '2025-04-10T10:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Mastering TypeScript with React',
    summary: 'Enhance your React applications with TypeScript for better developer experience',
    content: '<p>TypeScript adds static typing to JavaScript, making your code more robust and maintainable. This post covers how to use TypeScript effectively in React projects.</p><h2>Why TypeScript?</h2><p>TypeScript helps catch errors during development rather than at runtime, improving code quality and developer experience.</p><h2>Basic Types</h2><p>Learn about basic TypeScript types like string, number, boolean, array, and object.</p>',
    cover: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
    author: {
      _id: '102',
      username: 'janedoe'
    },
    createdAt: '2025-04-15T14:30:00.000Z',
    updatedAt: '2025-04-16T08:45:00.000Z'
  },
  {
    _id: '3',
    title: 'Building a Blog with Next.js',
    summary: 'Step-by-step guide to creating a full-featured blog using Next.js',
    content: '<p>This comprehensive guide will walk you through building a blog application with Next.js, complete with authentication, markdown support, and more.</p><h2>Project Structure</h2><p>We\'ll start by setting up the project structure for our blog application.</p><h2>Authentication</h2><p>Learn how to implement authentication for your blog using NextAuth.js.</p>',
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    author: {
      _id: '101',
      username: 'johndoe'
    },
    createdAt: '2025-04-20T09:15:00.000Z',
    updatedAt: '2025-04-21T11:20:00.000Z'
  }
];

// Get a specific post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Simulate a network request with a delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const { id } = params;
  const post = mockPosts.find(p => p._id === id);
  
  if (!post) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(post);
}

// Update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  // Check if post exists
  const postIndex = mockPosts.findIndex(p => p._id === id);
  if (postIndex === -1) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }
  
  // Get update data
  const updatedData = await request.json();
  
  // In a real app, we would update the database
  // For mock purposes, we'll just return the updated post
  const updatedPost = {
    ...mockPosts[postIndex],
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };
  
  return NextResponse.json(updatedPost);
}

// Delete a post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  // Check if post exists
  const postExists = mockPosts.some(p => p._id === id);
  
  if (!postExists) {
    return NextResponse.json(
      { error: 'Post not found' },
      { status: 404 }
    );
  }
  
  // In a real app, we would delete from the database
  // For mock purposes, we'll just return success
  
  return NextResponse.json({ message: 'Post deleted successfully' });
}
