import { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Login - My Blog",
  description: "Login to your blog account",
};

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
      <LoginForm />
    </div>
  );
}
