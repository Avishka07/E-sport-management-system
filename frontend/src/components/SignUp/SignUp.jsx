import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../../helper/validate";
import convertToBase64 from "../../helper/convert";
import { registerUser } from "../../helper/helper";
import { useAuthStore } from "../../store/store";
import logo from "../../assets/images/logo.png";
import ClipLoading from "../ClipLoading/ClipLoading";

export default function SignupForm({
  isOpen,
  onClose,
  openLoginModal,
  openSignUpRecommendationModel,
  setUserId,
}) {
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const setUsername = useAuthStore((state) => state.setUsername); // Access Zustand state
  const setToken = useAuthStore((state) => state.setToken); // Access Zustand state

  // Formik should always be called, regardless of the modal state
  const formik = useFormik({
    initialValues: {
      email: "",
      nickname: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || "" });
      setLoading(true);
      try {
        const response = await registerUser(values);

        // Assuming the API returns the token and username upon successful signup
        const { access_token, username, user_id } = response;

        // Store token and username in Zustand store
        setToken(access_token);
        setUsername(username);

        // Store token in localStorage for persistence
        localStorage.setItem("token", access_token);
        localStorage.setItem("username", username);

        setUserId(user_id);
        setLoading(false);
        onClose();
        openSignUpRecommendationModel();
      } catch (error) {
        // Handle error (e.g., show error message)
        toast.error("Registration failed. Please try again.");
      }
    },
  });

  // File upload handler
  // const onUpload = async (e) => {
  //   const base64 = await convertToBase64(e.target.files[0]);
  //   setFile(base64);
  // };

  // Render nothing if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Toaster for Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Modal Content */}
      <div className="bg-gray-800 text-primary_text p-8 rounded-lg w-full max-w-lg shadow-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-primary_text"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="ArenaSync Esports Logo" className="w-16" />
        </div>

        {/* Form Title */}
        <h2 className="text-center text-2xl mb-6">
          Welcome to ArenaSync eSports Platform!
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Enter your personal details to experience your eSport Portal.
        </p>
        {/* <div className="relative flex justify-center mb-4"> */}
        {/* Avatar */}
        {/* <label htmlFor="profile">
            <img
              src={file || avatar}
              className="w-20 h-20 rounded-full object-cover cursor-pointer"
              alt="avatar"
            /> */}
        {/* Camera Icon Overlay */}
        {/* <div className="absolute inset-0 flex items-center justify-center text-gray-300">
              <FontAwesomeIcon icon={faCamera} className="w-6 h-6" />
            </div>
          </label>
          <input
            onChange={onUpload}
            type="file"
            id="profile"
            name="profile"
            className="hidden"
          />
        </div> */}
        {/* Form */}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {/* <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
              <img src={file || avatar} className="w-20 h-20 rounded-full" alt="avatar" />
            </label>
            <input onChange={onUpload} type="file" id="profile" name="profile" />
          </div> */}

          <input
            {...formik.getFieldProps("email")}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 rounded-md text-gray-300"
          />
          <input
            {...formik.getFieldProps("nickname")}
            type="text"
            placeholder="Nickname"
            className="w-full p-3 bg-gray-700 rounded-md text-gray-300"
          />
          <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 rounded-md text-gray-300"
          />
          <button
            className="w-full bg-blue-600 p-3 rounded-md hover:bg-blue-700 h-12"
            type="submit"
            disabled={loading}
          >
            {loading ? <ClipLoading size={25} color={"#fff"} /> : "Register"}
          </button>
        </form>

        {/* Social Logins */}
        {/* <div className="flex justify-center items-center my-6 text-gray-400">
          <span className="mr-4">OR</span>
        </div> */}

        {/* <div className="flex flex-col space-y-4">
          <button className="w-full bg-blue-800 p-3 rounded-md flex items-center justify-center">
            Login With Facebook
          </button>
          <button className="w-full bg-white text-gray-800 p-3 rounded-md flex items-center justify-center">
            <img
              src="/path-to-google-icon.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
        </div> */}

        {/* Bottom Link */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => {
              !loading && onClose(); // Close the login modal
              !loading && openLoginModal(); // Open the signup modal
            }}
            disabled={loading}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}
