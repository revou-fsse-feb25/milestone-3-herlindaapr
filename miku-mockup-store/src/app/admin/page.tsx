"use client";

import { useSession } from "next-auth/react";
import AdminDashboard from "../components/AdminDashboard";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-teal-800 py-20">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-white">
                Admin Dashboard
              </h1>
              <div className="text-sm text-gray-100">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
            <AdminDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}