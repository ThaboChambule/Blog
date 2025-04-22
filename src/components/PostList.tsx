"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Author {
  _id: string;
  username: string;
}

interface Post {
  _id: string;
  title: string;
  summary: string;
  content: string;
  cover?: string;
  author: Author;
  createdAt: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError("Error loading posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-10">
        No posts found. Be the first to create one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post._id}`}>
          <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {post.cover && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                By {post.author.username} ·{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700">{post.summary}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
