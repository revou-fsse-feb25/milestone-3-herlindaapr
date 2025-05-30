"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    setError("");

    // In a real app, you would send this data to your API
    // For this demo, we'll just simulate registration and redirect to login
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to login with success message
      router.push("/login?registered=true");
    } catch (error) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-teal-950">
      <div className=" w-1/4 h-max p-10 bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-900">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-900/50 p-4 rounded-md border border-red-500">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}
          <div className="rounded-md space-y-3">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 bg-transparent border border-teal-400 placeholder-gray-400 text-teal-950 focus:outline-none focus:ring-teal-600 focus:border-teal-600 focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
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
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 bg-transparent border border-teal-400 placeholder-gray-400 text-teal-950 focus:outline-none focus:ring-teal-600 focus:border-teal-600 focus:z-10 sm:text-sm"
                placeholder="Password (min 6 characters)"
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
              {isLoading ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center py-2">
          <p className="text-gray-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-teal-400 hover:text-teal-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}