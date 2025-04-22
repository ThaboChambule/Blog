"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function logout() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUserInfo(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="py-6 mb-12">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            ThoughtSpace
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Explore
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            About
          </Link>

          {userInfo ? (
            <>
              <Link
                href="/create"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Write
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <span className="font-medium">{userInfo.username}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10 hidden group-hover:block">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Posts
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="mt-4 pt-4 border-t md:hidden">
          <Link
            href="/"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="#"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Explore
          </Link>
          <Link
            href="#"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            About
          </Link>

          {userInfo ? (
            <>
              <Link
                href="/create"
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                Write
              </Link>
              <Link
                href="#"
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                Profile
              </Link>
              <Link
                href="#"
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                My Posts
              </Link>
              <Link
                href="#"
                className="block py-2 text-gray-700 hover:text-blue-600"
              >
                Settings
              </Link>
              <button
                onClick={logout}
                className="block py-2 text-red-600 hover:text-red-800 w-full text-left"
              >
                Sign out
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 mt-2">
              <Link
                href="/login"
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
