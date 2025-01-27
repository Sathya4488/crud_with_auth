import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import img from "../assets/images/Exlorer_Illustration.png";
import { toast } from "react-toastify";

// Components
import CustomInput from "../components/CustomInput";

let signUpSchema = yup.object({
  username: yup.string().required("User name is Required"),
  email: yup
    .string()
    .required("Email is Required")
    .email("Email Should be valid"),
  password: yup.string().required("Password is Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is Required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [serverErrMsg, setServerErrMsg] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);

      try {
        await axios
          .post("http://localhost:8080/api/register", values)
          .then((response) => {
            navigate("/");
            toast("User created successfully.");
            // do something with the response
          });
      } catch (error) {
        console.log("error", error);
        if (error.response?.data) {
          setServerErrMsg(error.response?.data.message);
        }
      }
    },
  });

  console.log(serverErrMsg);

  return (
    <div className="isolate w-full flex items-center flex-col bg-white px-6 py-6 sm:py-12 h-screen sm:flex-row lg:px-8">
      <div className="w-full sm:w-1/2">
        <img src={img} alt="img" />
      </div>
      <div className="w-full sm:w-1/2">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-wider text-gray-900 sm:text-4xl">
            Create an account
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto mt-8 max-w-md"
          autocomplete="off"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:gap-y-6">
            <div className="sm:col-span-2">
              <CustomInput
                label="User name"
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange("username")}
                onBlur={formik.handleBlur("username")}
                error={formik.touched.username && formik.errors.username}
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
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                error={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className="sm:col-span-2">
              <CustomInput
                label="Confirm password"
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange("confirmPassword")}
                onBlur={formik.handleBlur("confirmPassword")}
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </div>
            {serverErrMsg && (
              <p className="text-red-600 text-right">{serverErrMsg}</p>
            )}
          </div>
          <div className="mt-7 sm:mt-10">
            <button
              type="submit"
              className="block w-full rounded-md tracking-widest bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
          <div className="mt-7 flex justify-end sm:mt-10">
            Already have an account?
            <Link className="ml-1 text-indigo-600 underline" to="/">
              {" "}
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
