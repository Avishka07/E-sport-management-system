import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../../helper/helper"; // Login API call
import { useAuthStore } from "../../store/store"; // Zustand store
import logo from "../../assets/images/logo.png"; // Your logo

export default function LoginForm({
  isOpen,
  onClose,
  openSignupModal,
  challenges,
  openEventRegistrationModal,
}) {
  // Add openSignupModal prop
  const navigate = useNavigate();

  // Zustand store functions
  const setUsername = useAuthStore((state) => state.setUsername);
  const setToken = useAuthStore((state) => state.setToken);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);

        // Assuming the API returns the token and username upon successful login
        const { access_token, username } = response;

        // Store token and username in Zustand store
        setToken(access_token);
        setUsername(username);

        // Store token in localStorage for persistence
        localStorage.setItem("token", access_token);

        // close signin popup
        if (challenges) {
          onClose();
          openEventRegistrationModal();
        } else onClose();
      } catch (error) {
        // Handle error (e.g., show error message)
        toast.error("Login failed. Please check your credentials.");
      }
    },
  });

  // Render nothing if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-primary_text w-full max-w-md relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-primary_text"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex justify-center mb-6">
          <img src={logo} alt="ArenaSync Esports Logo" className="w-16" />
        </div>
        <h2 className="text-2xl text-center mb-6">Login to ArenaSync eSports</h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <input
            {...formik.getFieldProps("email")}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 rounded-md text-gray-300"
          />
          <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 rounded-md text-gray-300"
          />
          <button
            className="w-full bg-blue-600 p-3 rounded-md hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => {
              onClose(); // Close the login modal
              openSignupModal(); // Open the signup modal
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
