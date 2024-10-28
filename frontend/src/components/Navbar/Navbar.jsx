import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import SignupForm from "../SignUp/SignUp";
import LoginForm from "../SignIn/SignIn";
import { useAuthStore } from "../../store/store"; // Zustand store for auth state
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
  faTwitch,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons"; // Brand Icons
import SignUpRecommendationForm from "../SignUpRecommendation/SignUpRecommendation";

export default function Navbar() {
  const [isSignupModalOpen, setIsSignupModelOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModelOpen] = useState(false);
  const [isSignUpRecommendationModalOpen, setIsSignUpRecommendationOpen] =
    useState(false);
  const [userId, setUserId] = useState(0);
  const { auth, logout } = useAuthStore(); // Access Zustand store

  const openSignupModal = () => setIsSignupModelOpen(true);
  const closeSignupModal = () => setIsSignupModelOpen(false);

  const openSignUpRecommendationModel = () =>
    setIsSignUpRecommendationOpen(true);
  const closeSignUpRecommendationModel = () =>
    setIsSignUpRecommendationOpen(false);

  const openLoginModal = () => setIsLoginModelOpen(true);
  const closeLoginModal = () => setIsLoginModelOpen(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear auth state in Zustand store
    localStorage.removeItem("token"); // Optionally clear token from localStorage
    navigate("/"); // Redirect to homepage after logout
  };

  const socialMedia = [
    { name: "Facebook", icon: faFacebook, link: "#" },
    { name: "Twitter", icon: faTwitter, link: "#" },
    { name: "Instagram", icon: faInstagram, link: "#" },
    { name: "YouTube", icon: faYoutube, link: "#" },
    { name: "Twitch", icon: faTwitch, link: "#" },
    { name: "Discord", icon: faDiscord, link: "#" },
  ];

  const navBarLink = [
    { name: "HOME", link: "/" },
    { name: "EVENTS", link: "#" },
    { name: "ORGANIZATIONS & CLANS", link: "#" },
    { name: "CHALLENGES", link: "#" },
  ];

  return (
    <header className="navbar bg-primary_bg text-primary_text">
      {/* Top Section with Social Media Links */}
      <div className="navbar-top border-b border-navbar_border_color flex justify-between items-center px-10 py-2">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-secondary_text mr-4">Follow Us</span>
          {socialMedia.map((platform, index) => (
            <a
              key={index}
              href={platform.link}
              className="text-primary_text mr-3 transition-colors duration-300 ease-in-out hover:text-secondary_text"
            >
              <FontAwesomeIcon icon={platform.icon} size="lg" />
            </a>
          ))}
        </div>
        <span className="navbar-welcome text-secondary_text text-sm">
          Welcome to ArenaSync eSports Platform!
        </span>
      </div>

      {/* Bottom Section with Logo, Nav Links, and Login/SignUp */}
      <nav className="navbar-bottom flex justify-between items-center py-4 px-4">
        {/* Logo */}
        <div className="w-24">
          <img src={logo} alt="ArenaSync Esports Logo" className="w-20" />
        </div>
        {/* Navigation Links */}
        <div className="flex space-x-16">
          {navBarLink.map((path, index) => (
            <Link
              key={index}
              to={path.link}
              className="hover:text-secondary_text transition-colors duration-300 ease-in-out font-medium"
            >
              {path.name}
            </Link>
          ))}
        </div>
        {/* Auth Links */}
        <div className="navbar-auth flex space-x-10">
          {auth.active ? (
            <>
              {/* Show Profile and Logout buttons if the user is logged in */}
              <Link
                to="/profile"
                className="border border-primary_text text-primary_text bg-primary_bg hover:bg-primary_text hover:text-primary_bg px-4 py-2"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="border border-primary_text text-primary_text bg-primary_bg hover:bg-primary_text hover:text-primary_bg px-4 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Show Signup and Login buttons if the user is not logged in */}
              <button
                onClick={openSignupModal}
                className="border border-primary_text text-primary_text bg-primary_bg hover:bg-primary_text hover:text-primary_bg px-4 py-2"
              >
                Sign Up
              </button>
              <button
                onClick={openLoginModal}
                className="border border-primary_text text-primary_text bg-primary_bg hover:bg-primary_text hover:text-primary_bg px-4 py-2"
              >
                Login
              </button>
            </>
          )}
        </div>
        {/* Signup Modal */}
        <SignupForm
          isOpen={isSignupModalOpen}
          onClose={closeSignupModal}
          openLoginModal={openLoginModal}
          registrationForm={true}
          openSignUpRecommendationModel={openSignUpRecommendationModel}
          setUserId={setUserId}
        />
        {/* Pass openLoginModal */}
        {/* Login Modal */}
        <LoginForm
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          openSignupModal={openSignupModal}
        />
        {isSignUpRecommendationModalOpen && (
          <SignUpRecommendationForm
            onClose={closeSignUpRecommendationModel}
            userId={userId}
          />
        )}
        {/* Pass openSignupModal */}
      </nav>
    </header>
  );
}
