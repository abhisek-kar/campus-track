import React, { useEffect, useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ReactComponent as LoginSVG } from "../../../assets/svg/Login.svg";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./../../../components/Loader";
import ForgotPasswordModal from "./../../../components/modals/ForgotPasswordModal";
import * as Yup from "yup";
import { loginUserAsync } from "../authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const roles = ["student", "faculty", "admin"];

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resetPassword, setResetPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { loading, userRole } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "student",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUserAsync(values));
    },
  });

  useEffect(() => {
    if (userRole) {
      switch (userRole) {
        case "admin":
          return navigate("/admin");
        case "faculty":
          return navigate("/faculty");
        case "student":
          return navigate("/student");
        default:
          return;
      }
    }
  }, [navigate, userRole]);

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
      <form
        className="min-h-screen w-full flex flex-col justify-center items-center p-3 bg-white"
        onSubmit={formik.handleSubmit}
      >
        <div className="poppins-medium text-2xl mb-10">Please Login !</div>
        {/* roles */}
        <div className="flex gap-5 mb-2">
          {roles.map((item) => (
            <label
              key={item}
              className="poppins-medium text-lg inline-flex items-center gap-2"
            >
              <input
                type="radio"
                name="role"
                value={item}
                checked={formik.values.role === item}
                onChange={formik.handleChange}
                className="form-radio h-5 w-5 text-themeBlue focus:ring-themeBlue"
              />
              <span className="ml-2">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
            </label>
          ))}
        </div>

        {/* email section */}
        <div className="w-full flex flex-col mb-2">
          <label className="poppins-medium text-lg tracking-wide">
            Enter Your Mail
          </label>
          <input
            name="email"
            type="text"
            placeholder="e.g xyz@gmail.com"
            className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide poppins-regular focus:outline-none focus:border-themeBlue"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className=" mb-1 text-red-500 poppins-medium text-sm">
              {formik.errors.email}
            </div>
          )}{" "}
        </div>

        {/* password section */}
        <div className="w-full mb-2 flex flex-col relative">
          <label className="poppins-medium text-lg tracking-wide">
            Enter Password
          </label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="*********"
            className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide poppins-regular focus:outline-none focus:border-themeBlue"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className=" mb-1 text-red-500 poppins-medium text-sm">
              {formik.errors.password}
            </div>
          )}
          <div className="absolute top-[45px] right-4">
            {showPassword ? (
              <AiFillEye
                className="w-5 h-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiFillEyeInvisible
                className="w-5 h-5 cursor-pointer"
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
      </form>

      {/* showing reset password component */}
      {resetPassword && (
        <ForgotPasswordModal onClose={() => setResetPassword(false)} />
      )}
      {loading ? <Loader /> : null}
    </div>
  );
};

export default Login;
