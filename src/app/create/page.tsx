import { Metadata } from "next";
import CreatePostForm from "@/components/CreatePostForm";

export const metadata: Metadata = {
  title: "Create Post - My Blog",
  description: "Create a new blog post",
};

export default function CreatePostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <CreatePostForm />
    </div>
  );
}
