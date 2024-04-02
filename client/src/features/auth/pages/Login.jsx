import React, { useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ReactComponent as LoginSVG } from "../../../assets/svg/Login.svg";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./../../../components/Loader";
import ForgotPasswordModal from "./../../../components/modals/ForgotPasswordModal";
import { loginUser } from "./../../../redux/auth/authSlices";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const roles = ["student", "faculty", "admin"];

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  mail: Yup.string().email("Invalid email address").required("email required"),
  password: Yup.string().required("password required"),
  role: Yup.string().required("role required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const [resetPassword, setResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    dispatch(loginUser(values));
  };

  return (
    <div
      className="grid min-h-screen"
      style={{ gridTemplateColumns: "2fr 1fr" }}
    >
      <Toaster />

      {/* svg components */}
      <div className="w-full h-screen flex justify-center items-center">
        <LoginSVG className="w-full h-full" />
      </div>
      {/* login side */}
      <Formik
        initialValues={{
          mail: "",
          password: "",
          role: "student",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="min-h-screen w-full flex flex-col justify-center items-center p-3 bg-white">
            <div className="poppins-medium text-2xl mb-10">Please Login !</div>
            {/* roles */}
            <div className="flex gap-5 mb-2">
              {roles.map((item) => {
                return (
                  <label
                    className="poppins-medium text-lg inline-flex items-center gap-2"
                    key={item}
                  >
                    <Field
                      type="radio"
                      name="role"
                      value={item}
                      className="form-radio h-5 w-5 text-themeBlue focus:ring-themeBlue "
                    />
                    <span className="ml-2">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* email section */}
            <div className="w-full flex flex-col mb-2 ">
              <label className="poppins-medium text-lg  tracking-wide ">
                Enter Your Mail
              </label>
              <Field
                name="mail"
                type="text"
                placeholder="e.g xyz@gmail.com"
                className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide poppins-regular focus:outline-0  focus:border-themeBlue"
              />
              <div className="mb-2 text-red-500">
                <ErrorMessage name="mail" />
              </div>
            </div>
            {/* password section */}
            <div className="w-full mb-2 flex flex-col relative">
              <label className="poppins-medium text-lg   tracking-wide ">
                Enter Password
              </label>
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide poppins-regular focus:outline-0  focus:border-themeBlue"
              />
              <div className="mb-2 text-red-500">
                <ErrorMessage name="password" />
              </div>
              <div className="absolute top-[45px] right-4">
                {" "}
                {showPassword ? (
                  <AiFillEye
                    className=" w-5 h-5 cursor-pointer  "
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <AiFillEyeInvisible
                    className="   w-5 h-5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            {/* reset password */}
            <div className="w-full flex justify-end mr-5 mt-2 mb-10">
              <Link
                className="text-themeBlue poppins-medium-italic"
                onClick={() => setResetPassword(true)}
              >
                Forgot Password?
              </Link>
            </div>
            {/* submit button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center shadow-lg shadow-gray-800 rounded-full hover:bg-opacity-90 bg-themeBlue p-2 text-white poppins-medium tracking-wide text-xl"
            >
              <span className="flex-1 text-center">Login</span>
              <FiArrowRightCircle className="mr-3" />
            </button>
          </Form>
        )}
      </Formik>

      {/* showing reset password component  */}
      {resetPassword && (
        <ForgotPasswordModal
          showModal={resetPassword}
          onClose={() => setResetPassword(false)}
        />
      )}
    </div>
  );
};

export default Login;
