"use client";

import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface EditPostFormProps {
  id: string;
}

export default function EditPostForm({ id }: EditPostFormProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [currentCover, setCurrentCover] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const router = useRouter();

  // Fetch existing post data
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post not found");
          }
          throw new Error("Failed to fetch post");
        }

        const postData = await response.json();
        setTitle(postData.title);
        setSummary(postData.summary);
        setContent(postData.content);
        if (postData.cover) {
          setCurrentCover(postData.cover);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";
        setError(errorMessage);
        console.error(err);
      } finally {
        setFetchingPost(false);
      }
    }

    fetchPost();
  }, [id]);

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError("");

    if (!title || !summary || !content) {
      setError("Title, summary and content are required");
      return;
    }

    setLoading(true);

    try {
      // Handle file upload if a new cover image is selected
      let coverUrl = currentCover;
      if (files && files[0]) {
        const formData = new FormData();
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
        // coverUrl = uploadData.url;
      }

      const postData = {
        title,
        summary,
        content,
        cover: coverUrl,
      };

      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update post");
      }

      router.push(`/post/${id}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (fetchingPost) {
    return <div className="text-center py-10">Loading post data...</div>;
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
        {currentCover && (
          <div className="mb-2">
            <img
              src={currentCover}
              alt="Current cover"
              className="h-32 object-cover rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">Current cover image</p>
          </div>
        )}
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
          {loading ? "Updating..." : "Update Post"}
        </button>
      </div>
    </form>
  );
}
