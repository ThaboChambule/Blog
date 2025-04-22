"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "./UserContext";

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
  updatedAt: string;
}

export default function PostDetail({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userInfo } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post not found");
          }
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError((err as Error).message || "Error loading post");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  async function deletePost() {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      router.push("/");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-10">Post not found</div>;
  }

  const isAuthor = userInfo && post.author._id === userInfo.id;

  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center mb-6 text-gray-600">
        <div>
          By <span className="font-medium">{post.author.username}</span> ·{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        {isAuthor && (
          <div className="ml-auto flex gap-4">
            <Link
              href={`/edit/${post._id}`}
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
            <button
              onClick={deletePost}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {post.cover && (
        <div className="relative h-96 w-full mb-6">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
