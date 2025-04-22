"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError("");

    if (!title || !summary || !content) {
      setError("Title, summary and content are required");
      return;
    }

    setLoading(true);

    try {
      // Handle file upload if a cover image is selected
      const formData = new FormData();
      if (files && files[0]) {
        formData.append("file", files[0]);

        // Upload image to your server or a service like Cloudinary
        // This is a placeholder for image upload logic
        // const uploadResponse = await fetch('/api/upload', {
        //   method: 'POST',
        //   body: formData,
        //   credentials: 'include',
        // });

        // if (!uploadResponse.ok) {
        //   throw new Error('Failed to upload image');
        // }

        // const uploadData = await uploadResponse.json();
        // const coverUrl = uploadData.url;
      }

      // For now, we'll skip image upload and just create the post
      const postData = {
        title,
        summary,
        content,
        // cover: coverUrl, // Uncomment when you implement image upload
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create post");
      }

      const post = await response.json();
      router.push(`/post/${post._id}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block mb-1 font-medium">
          Post Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="summary" className="block mb-1 font-medium">
          Summary
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          rows={2}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cover" className="block mb-1 font-medium">
          Cover Image
        </label>
        <input
          id="cover"
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFiles(e.target.files)
          }
          className="w-full px-3 py-2 border rounded-md"
          accept="image/jpeg,image/png,image/webp"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block mb-1 font-medium">
          Content
        </label>
        <div className="border rounded-md">
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            className="h-64 mb-12"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </div>
    </form>
  );
}
