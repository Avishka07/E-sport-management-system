import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { fetchAllGames, addFavoriteGames } from "../../helper/helper";
import { useAuthStore } from "../../store/store";
import logo from "../../assets/images/logo.png";
import ClipLoading from "../ClipLoading/ClipLoading";

export default function SignUpRecommendationForm({
  onClose,
  challenges,
  openEventRegistrationModal,
  userId,
}) {
  const [file, setFile] = useState();
  const [gameList, setGameList] = useState();
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetchAllGames();
      setGameList(response.data);
      setLoading(false);
    };
    fetchList();
  }, []);

  const setUsername = useAuthStore((state) => state.setUsername); // Access Zustand state
  const setToken = useAuthStore((state) => state.setToken); // Access Zustand state

  const formik = useFormik({
    initialValues: {
      player_id: userId,
      games: "",
    },
    validationSchema: Yup.object({
      games: Yup.array().min(1, "At least one game must be selected"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setSubmitLoading(true);
      try {
        const response = await addFavoriteGames(values);
        // Redirect to user home page
        toast.success("Sign up successfully");
        setSubmitLoading(false);
        if (challenges) {
          onClose();
          openEventRegistrationModal();
        } else onClose();
      } catch (error) {
        console.log(error);
        toast.error("Registration failed. Please try again.");
      }
    },
  });

  const handleCheckboxChange = (gameId) => {
    const selectedGames = formik.values.games;
    if (selectedGames.includes(gameId)) {
      // Remove the gameId from the array if it's already selected
      const updatedGames = selectedGames.filter((id) => id !== gameId);
      formik.setFieldValue("games", updatedGames);
    } else {
      // Add the gameId to the array if it's not selected
      formik.setFieldValue("games", [...selectedGames, gameId]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Toaster for Notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Modal Content */}
      <div className="bg-gray-800 text-primary_text p-8 rounded-lg w-full max-w-lg shadow-lg relative">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="ArenaSync Esports Logo" className="w-16" />
        </div>

        {/* Form Title */}
        <h2 className="text-center text-2xl mb-6">
          Welcome to ArenaSync eSports Platform!
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Select Your Favorite Games
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          {loading ? (
            <div className="flex items-center justify-center">
              <ClipLoading color={"#fff"} />
            </div>
          ) : (
            <div
              className={`px-5 ${
                gameList.length > 5 ? "grid grid-cols-2" : "flex flex-col"
              }`}
            >
              {gameList.map((game) => (
                <div key={game.gameId} className="checkbox-container flex mb-2">
                  <input
                    type="checkbox"
                    id={`game-${game.gameId}`}
                    name="games"
                    value={game.gameId}
                    checked={formik.values.games.includes(game.gameId)} // Set the checkbox as checked if the gameId is in the array
                    onChange={() => handleCheckboxChange(game.gameId)} // Call the handler on change
                    className="custom-checkbox custom-checkbox-form"
                  />
                  <label
                    htmlFor={`game-${game.gameId}`}
                    className="custom-label uppercase"
                  >
                    {game.gameName}
                  </label>
                </div>
              ))}
              {formik.touched.games && formik.errors.games && (
                <p className="pt-1 text-custom_red text-sm">
                  {formik.errors.games}
                </p>
              )}
            </div>
          )}
          <button
            className="w-full bg-blue-600 p-3 rounded-md hover:bg-blue-700 h-12"
            type="submit"
            disabled={submitLoading && gameList == null}
          >
            {submitLoading ? (
              <ClipLoading size={25} color={"#fff"} />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
