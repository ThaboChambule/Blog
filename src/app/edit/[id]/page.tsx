import { Metadata } from "next";
import EditPostForm from "@/components/EditPostForm";

export const metadata: Metadata = {
  title: "Edit Post - My Blog",
  description: "Edit your blog post",
};

export default function EditPostPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <EditPostForm id={params.id} />
    </div>
  );
}
