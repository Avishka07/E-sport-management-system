import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import { createAdminGame, updateGame } from "../../helper/adminhelper";
import { RxCross2 } from "react-icons/rx";
import ClipLoading from "../ClipLoading/ClipLoading";

const AddGame = ({ onClose, editEvent, item, fetchEvents, resetPage }) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("admin_token");
  const genres = [
    "Action",
    "Adventure",
    "RPG",
    "Simulation",
    "Strategy",
    "Sports",
    "Puzzle",
    "Racing",
  ];

  const formik = useFormik({
    initialValues: editEvent
      ? {
          game: item.gameName || "",
          genre: item.genre || "",
        }
      : {
          game: "",
          genre: "",
        },
    validationSchema: Yup.object({
      game: Yup.string().required("Game Name is required"),
      genre: Yup.string().required("Genre is required"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      setLoading(true);
      if (editEvent) {
        try {
          await updateGame(item.gameId, values, token);
          toast.success("Game updated successfully");
          setTimeout(() => {
            fetchEvents();
            toast.dismiss();
            setLoading(false);
            resetPage();
            onClose();
          }, 1000);
        } catch (error) {
          toast.error("Game Update Failed");
          setTimeout(() => {
            toast.dismiss();
            setLoading(false);
          }, 1000);
        }
      } else {
        try {
          await createAdminGame(values, token);
          toast.success("Game created successfully");
          setTimeout(() => {
            fetchEvents();
            toast.dismiss();
            setLoading(false);
            resetPage();
            onClose();
          }, 1000);
        } catch (error) {
          toast.error("Game Adding Failed");
          setTimeout(() => {
            toast.dismiss();
            setLoading(false);
          }, 1000);
        }
      }
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <Toaster position="top-center" />
      <div className="relative flex flex-col bg-background xl:px-12 p-6 pt-16 rounded-lg w-80 xl:w-1/4 overflow-y-auto">
        <div className="absolute top-0 left-0 w-full flex justify-center items-center p-4 bg-custom_white z-10">
          <p className="text-custom_black text-xl sm:text-4xl font-bold">
            {editEvent ? "Update Game" : "Create New Game"}
          </p>
          <div
            className="text-custom_orange cursor-pointer absolute right-6"
            onClick={onClose}
          >
            <RxCross2 className="text-custom_red" />
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="w-full sm:pt-10">
          <div className="flex flex-col w-full pb-5">
            <label htmlFor="game" className="text-black text-lg font-semibold">
              Game Name
            </label>
            <input
              type="text"
              name="game"
              placeholder="Enter game name"
              id="game"
              value={formik.values.game}
              onChange={formik.handleChange}
              className={`w-full border text-black ${
                formik.errors.game
                  ? "border-custom_red"
                  : "border-name_background"
              } h-10 rounded pl-3 focus:outline-none focus:border-name_background`}
            />
            {formik.touched.game && formik.errors.game && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.game}
              </p>
            )}
          </div>
          <div className="flex flex-col w-full pb-5">
            <label
              htmlFor="registrationClosing"
              className="text-black text-lg font-semibold"
            >
              Genre
            </label>
            <div className="grid grid-cols-2">
              {genres.map((game) => (
                <div key={game} className="flex mb-2">
                  <input
                    type="radio"
                    id={`game-${game}`}
                    name="genre"
                    value={game}
                    onChange={(e) =>
                      formik.setFieldValue("genre", e.target.value)
                    }
                    className="custom-radio custom-radio-label"
                    checked={formik.values.genre.includes(game)}
                  />
                  <label
                    htmlFor={`game-${game}`}
                    className="custom-radio-label uppercase"
                  >
                    {game}
                  </label>
                </div>
              ))}
            </div>
            {formik.touched.genre && formik.errors.genre && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.genre}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full h-12 text-xl font-semibold items-center justify-center border-2 border-name_background text-primary_text rounded-md bg-name_background hover:bg-country_background hover:shadow-[0_0_10px_5px_rgba(0,0,30,0.4)]"
            disabled={loading}
          >
            {loading ? (
              <div className="pt-1">
                <ClipLoading color={"#fff"} size={"30px"} />
              </div>
            ) : editEvent ? (
              "Update Game"
            ) : (
              "Create Game"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGame;
