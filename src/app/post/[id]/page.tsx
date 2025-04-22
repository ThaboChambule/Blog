import { Metadata } from "next";
import PostDetail from "@/components/PostDetail";

export const metadata: Metadata = {
  title: "Blog Post",
  description: "Read this blog post",
};

export default function PostPage({ params }: { params: { id: string } }) {
  return <PostDetail id={params.id} />;
}
