"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import AdminSidebar from "@/app/components/AdminSidebar";
import { getUser } from "@/app/services/userServices";
import { User } from "@/app/types/index.types";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  let error: string | null = null;

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const res = await getUser();
        const jsonData = await res.json()
        console.log(jsonData)
        setUsers(jsonData.users)
    } catch (e:any) {
        error = e.message;
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-teal-900">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6 mt-20">
              <h1 className="text-2xl font-semibold text-white">
                User Management
              </h1>
              <button className="bg-teal-600 px-4 py-2 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add User
              </button>
            </div>

            {error && (
              <div className="bg-red-900/50 p-4 rounded-md mb-6 border border-red-500">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="bg-teal-950 shadow overflow-hidden sm:rounded-lg border border-teal-700">
                <table className="min-w-full divide-y divide-teal-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Joined
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-teal-950 divide-y divide-teal-700">
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-teal-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover border border-teal-600"
                                src={user.avatar}
                                alt={user.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://placehold.co/400";
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-50">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "admin"
                                ? "bg-purple-900 text-purple-200"
                                : "bg-blue-900 text-blue-200"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {new Date(user.creationAt).toLocaleDateString()}
                            </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-400 hover:text-indigo-300 mr-4 transition-colors">
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit
                            </span>
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}