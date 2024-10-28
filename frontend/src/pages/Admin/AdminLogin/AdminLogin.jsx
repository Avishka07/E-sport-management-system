// src/pages/AdminLogin.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStore } from "../../../store/store"; // Zustand store for admin
import { Toaster, toast } from "react-hot-toast";
import { adminLogin } from "../../../helper/adminhelper";

export default function AdminLogin() {
  const navigate = useNavigate();
  const loginAdmin = useAdminStore((state) => state.loginAdmin); // Access Zustand state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { email, password };

    try {
      // Make the admin login request
      const response = await adminLogin(credentials);

      // Assuming the response contains a token and username
      const { access_token } = response;

      // Store token and username in Zustand store
      loginAdmin(email);
      localStorage.setItem("admin_token", access_token); // Save the token for persistence

      toast.success("Login successful");
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    } catch (error) {
      toast.error(error.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border bg-background_gray border-blue_text text-event_text">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary_text">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 bg-gray-100 border border-gray-300 rounded-md focus:outline-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 text-primary_text"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
