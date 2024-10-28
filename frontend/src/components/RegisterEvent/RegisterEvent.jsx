import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/images/logo.png";
import * as Yup from "yup";
import { fetchCountries, registerTournament } from "../../helper/helper";

export default function RegisterEvent({ onClose, eventid, fetchData }) {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedCountries] = await Promise.all([fetchCountries()]);
        setCountryList(fetchedCountries);
      } catch (error) {
        toast.error("Failed to load data");
      }
    };
    fetchData();
  }, []);

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      event_id: eventid,
      country: "",
      phone_number: "",
      date_of_birth: "",
      gender: "",
    },
    validationSchema: Yup.object({
      country: Yup.string().required("Country is required"),
      phone_number: Yup.string().required("Phone Number is required"),
      date_of_birth: Yup.string().required("Date of Birth is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await registerTournament(values);
        toast.success("Registered successfully");
        fetchData();
        setTimeout(() => {
          toast.dismiss();
          onClose();
        }, 1000);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Registration Failed");
        setTimeout(() => {
          toast.dismiss();
        }, 1000);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Toaster position="top-center" />

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
        <h2 className="text-2xl text-center mb-6">Register to Tournament</h2>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="country"
              className="text-primary_text text-lg font-medium"
            >
              Country
            </label>
            <select
              name="country"
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300  
                ${
                  formik.errors.country
                    ? "border-custom_red"
                    : "border-name_background"
                }`}
              value={formik.values.country}
              onChange={formik.handleChange}
            >
              <option value="" hidden>
                Select Country
              </option>
              {countryList.map((country) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
            {formik.touched.country && formik.errors.country && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.country}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone_number"
              className="text-primary_text text-lg font-medium"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              id="phone_number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300 ${
                formik.errors.phone_number
                  ? "border-custom_red"
                  : "border-name_background"
              } rounded pl-3`}
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.phone_number}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="date_of_birth"
              className="text-primary_text text-lg font-medium"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              placeholder="Date of Birth"
              id="date_of_birth"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300 ${
                formik.errors.phone_number
                  ? "border-custom_red"
                  : "border-name_background"
              } rounded pl-3`}
            />
            {formik.touched.phone_number && formik.errors.date_of_birth && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.date_of_birth}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="gender"
              className="text-primary_text text-lg font-medium"
            >
              Gender
            </label>
            <select
              name="gender"
              className={`w-full p-3 bg-gray-700 rounded-md text-gray-300  
                ${
                  formik.errors.gender
                    ? "border-custom_red"
                    : "border-name_background"
                }`}
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option value="" hidden>
                Gender
              </option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="pt-1 text-custom_red text-sm">
                {formik.errors.gender}
              </p>
            )}
          </div>
          <button
            className="w-full bg-blue-600 p-3 rounded-md hover:bg-blue-700"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
