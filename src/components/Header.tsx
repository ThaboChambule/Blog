import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const router = useRouter();

  async function logout() {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setUserInfo(null);
    router.push("/");
  }

  return (
    <header className="flex justify-between items-center mb-6 py-4">
      <Link href="/" className="text-2xl font-bold">
        My Blog
      </Link>
      <nav className="flex gap-4">
        {userInfo ? (
          <>
            <Link href="/create" className="hover:underline">
              Create new post
            </Link>
            <button onClick={logout} className="ml-4 hover:underline">
              Logout ({userInfo.username})
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
