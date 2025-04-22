import { Metadata } from "next";
import Link from "next/link";
import PostList from "@/components/PostList";

export const metadata: Metadata = {
  title: "My Blog - Home",
  description: "Read the latest blog posts",
};

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <PostList />
    </div>
  );
}
