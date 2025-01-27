import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

// Components
import CustomInput from "../components/CustomInput";
import MainLayout from "../layouts/MainLayout";
import { useUserContext } from "../contexts/UserContext";

let studentSchema = yup.object({
  name: yup.string().required("Name is Required"),
  email: yup
    .string()
    .required("Email is Required")
    .email("Email Should be valid"),
  department: yup.string().required("Department is Required"),
  grade: yup
    .string()
    .required("Grade is Required")
    .test(
      "is-valid-grade",
      "Grade must be a number between 1 and 10",
      (value) => {
        if (!value) return false; // Ensure value exists
        const numericValue = Number(value);
        return numericValue >= 1 && numericValue <= 10 && !isNaN(numericValue);
      }
    ),
  enrollNumber: yup
    .string()
    .length(10, "Enroll number must be exactly 10 characters")
    .required("Enroll number is Required"),
});

const AddNewStudent = () => {
  const navigate = useNavigate();
  const userData = useUserContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      department: "",
      grade: "",
      enrollNumber: "",
    },
    validationSchema: studentSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const payload = { ...values, user: userData.id };
      console.log("payload", payload);

      await axios
        .post("http://localhost:8080/api/students", payload)
        .then((response) => {
          navigate("/");
          console.log("response after creating", response);

          toast("New student created successfully.");
          // do something with the response
        })
        .catch((error) => {
          console.error(error);
          // handle the error
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <MainLayout>
      <div className={`w-full h-full p-8 bg-character bg-cover`}>
        <div className="px-0 sm:px-4">
          <Link
            className="flex items-center gap-x-2 text-lg text-indigo-600"
            to="/dashboard"
          >
            <div className="h-4 w-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
            </div>
            Back to dashboard
          </Link>
          <h2 className="text-xl mt-4 font-bold tracking-wider text-gray-900 sm:text-2xl">
            Add new student!
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="pl-0 sm:pl-4 mt-8 max-w-md"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:gap-y-4">
            <div className="sm:col-span-2">
              <CustomInput
                label="Name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                error={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className="sm:col-span-2">
              <CustomInput
                label="Email"
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                error={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className="sm:col-span-2">
              <CustomInput
                label="Enroll Number"
                type="text"
                name="enrollNumber"
                value={formik.values.enrollNumber}
                onChange={formik.handleChange("enrollNumber")}
                onBlur={formik.handleBlur("enrollNumber")}
                error={
                  formik.touched.enrollNumber && formik.errors.enrollNumber
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold leading-6 text-gray-900">
                Department
              </label>
              <select
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange("department")}
                onBlur={formik.handleBlur("department")}
                className={`w-full mt-1.5 text-gray-900 font-medium text-sm bg-white border border-gray-300 rounded-md px-3 py-2`}
              >
                <option value="" disabled>
                  Select Department
                </option>
                <option value="ECE">ECE</option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
              </select>
              {formik.touched.department && formik.errors.department && (
                <p className="text-red-600">{formik.errors.department}</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <CustomInput
                label="Grade"
                type="text"
                name="grade"
                value={formik.values.grade}
                onChange={formik.handleChange("grade")}
                onBlur={formik.handleBlur("grade")}
                error={formik.touched.grade && formik.errors.grade}
              />
            </div>
            {/* <div className="sm:col-span-2">
              <p className="block text-sm font-semibold leading-6 text-gray-900">
                Upload avatar
              </p>
              <input
                type="file"
                onChange={formik.handleChange("avatar")}
                // onChange={(e) => handleFileUpload(e)}
                class="w-full mt-1.5 text-gray-500 font-medium text-sm bg-inherit border-0  file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
              />
            </div> */}
          </div>
          <div className="mt-7 sm:mt-10">
            <button
              type="submit"
              className="block w-full rounded-md tracking-widest bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddNewStudent;
