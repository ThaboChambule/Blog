'use client';

import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const router = useRouter();

  async function logout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        setUserInfo(null);
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <header className="flex justify-between items-center mb-8 py-4 border-b">
      <Link href="/" className="font-bold text-xl">My Blog</Link>
      <nav className="flex gap-6 items-center">
        {userInfo ? (
          <>
            <Link href="/create" className="hover:text-blue-600">
              Create Post
            </Link>
            <span className="text-gray-600">
              Hello, {userInfo.username}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link 
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
