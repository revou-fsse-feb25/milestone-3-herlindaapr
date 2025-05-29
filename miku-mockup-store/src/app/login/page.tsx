"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for registration success message
    if (searchParams.get("registered") === "true") {
      setSuccess("Registration successful! Please log in.");
    }

    // Check for error message
    const errorMessage = searchParams.get("error");
    if (errorMessage) {
      setError(
        errorMessage === "CredentialsSignin"
          ? "Invalid email or password"
          : "An error occurred. Please try again."
      );
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else if (result?.ok) {
        // Successful login - redirect will be handled by middleware
        router.refresh();
        router.push("/");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-teal-950">
      <div className="w-1/4 h-max space-y-8 p-10 bg-white">
        <div className="w-full">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/50 p-4 rounded-md border border-red-500">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-900/50 p-4 rounded-md border border-green-500">
              <p className="text-sm text-green-200">{success}</p>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 bg-transparent border border-teal-400 placeholder-gray-400 text-teal-950 focus:outline-none focus:ring-teal-600 focus:border-teal-600 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 bg-transparent border border-teal-400 placeholder-gray-400 text-teal-950 focus:outline-none focus:ring-teal-600 focus:border-teal-600 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-teal-700 cursor-not-allowed"
                  : "bg-teal-600 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p className="text-gray-300">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-teal-400 hover:text-teal-600"
            >
              Register
            </Link>
          </p>
          <p className="mt-2 text-xs text-gray-400">
            Admin: admin@example.com / admin123
            <br />
            User: user@example.com / user123
          </p>
        </div>
      </div>
    </div>
  );
}