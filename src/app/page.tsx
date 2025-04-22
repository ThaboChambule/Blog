import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PostList from "@/components/PostList";

export const metadata: Metadata = {
  title: "ThoughtSpace - A Modern Blog",
  description:
    "Explore insightful articles on technology, development, and design",
};

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/patterns/circuit-board.svg"
            alt="Background Pattern"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative px-6 py-24 sm:px-12 md:flex md:items-center md:justify-between md:py-20 max-w-7xl mx-auto">
          <div className="md:w-1/2 text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Welcome to <span className="text-yellow-300">ThoughtSpace</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-lg">
              Explore insights, ideas, and inspiration from technology to
              design. Join our community of thinkers and creators.
            </p>
            <div className="space-x-4">
              <Link
                href="/create"
                className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Start Writing
              </Link>
              <Link
                href="#latest-posts"
                className="inline-block bg-transparent border-2 border-white text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition"
              >
                Explore Posts
              </Link>
            </div>
          </div>

          <div className="mt-10 md:mt-0 md:w-2/5">
            <div className="relative h-80 w-full">
              <Image
                src="/writing-illustration.svg"
                alt="Blog illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {["Technology", "Design", "Development", "Productivity"].map(
            (category) => (
              <div
                key={category}
                className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-6 py-4 text-center transition cursor-pointer"
              >
                <h3 className="font-medium text-lg text-gray-800">
                  {category}
                </h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Latest Posts Section */}
      <section id="latest-posts">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Latest Articles</h2>
          <Link
            href="/archive"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            View All
          </Link>
        </div>

        <PostList />
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest articles and insights delivered straight to your
            inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
