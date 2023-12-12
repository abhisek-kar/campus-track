import React, { useEffect, useState } from "react";
import InputBox from "../../components/InputBox";
import { FiArrowRightCircle } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ReactComponent as LoginSVG } from "../../assets/svg/Login.svg";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/authSlices";
import { Link } from "react-router-dom";
import ForgotPasswordModal from "../../components/modals/ForgotPasswordModal";
import StudentRegister from "../../components/auth/StudentRegister";
import FacultyRegister from "../../components/auth/FacultyRegister";
import AdminRegister from "../../components/auth/AdminRegister";

const Login = () => {
  const { loading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [isRegisterPage, setIsRegisterPage] = useState(false);

  useEffect(() => {
    // Create a URLSearchParams object from the current URL
    const searchParams = new URLSearchParams(window.location.search);
    // Access a specific query parameter by name
    const userRole = searchParams.get("role");
    if (!userRole) {
      window.location.replace("/");
    }
    setRole(userRole);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are mandatory", { duration: 2000 });
      return;
    }
    dispatch(loginUser({ email, password, role }));
    setEmail("");
    setPassword("");
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
      {!isRegisterPage ? (
        <form
          onSubmit={handleSubmit}
          className=" min-h-screen w-full flex flex-col  justify-center items-center p-3 "
          style={{ backgroundColor: "white" }}
        >
          <div className=" font-mono text-2xl mt-1 mb-5 font-semibold tracking-wider text-gray-700 border-b-2 border-gray-600">
            {role && role.charAt(0).toUpperCase() + role.slice(1)} Login
          </div>
          <InputBox
            placeholder={"e.g xyz@gmail.com"}
            labelName={"Your Email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* password */}
          <div className="mt-2 mb-3 w-full relative">
            <label
              htmlFor=""
              className="font-semibold text-lg  text-gray-600 tracking-wide "
            >
              Enter password
            </label>

            <input
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[3px] border-themeBlue mt-1 p-3 rounded-md w-full tracking-wide font-mono  focus:outline-0 focus:border-2 focus:border-themeBlue"
              placeholder={"*********"}
            />
            {showPassword ? (
              <AiFillEyeInvisible
                className="absolute top-[60%] right-4 w-5 h-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiFillEye
                className="absolute top-[60%] right-4 w-5 h-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <div className=" w-full flex justify-end mr-5  mb-10">
            <Link
              className="text-themeBlue font-mono "
              onClick={() => setResetPassword(true)}
            >
              Forgot Password?
            </Link>
          </div>
          {/* submit button */}
          <button
            type="submit"
            className="w-full  flex items-center justify-center shadow-lg shadow-gray-800 rounded-full hover:bg-opacity-90 bg-themeBlue p-2   text-white font-mono font-semibold tracking-wide text-xl"
          >
            <span className="flex-1 text-center">Login</span>
            <FiArrowRightCircle className="mr-3" />
          </button>
          <div className="mt-3 text-themeBlue">
            Not Registered Yet?{" "}
            <span
              className="font-semibold cursor-pointer "
              onClick={(e) => setIsRegisterPage(true)}
            >
              please Sign Up
            </span>
          </div>
        </form>
      ) : null}
      {/* register pages rollwise */}
      {isRegisterPage && role === "student" ? (
        <StudentRegister onClick={() => setIsRegisterPage(false)} />
      ) : null}
      {isRegisterPage && role === "faculty" ? (
        <FacultyRegister onClick={() => setIsRegisterPage(false)} />
      ) : null}
      {isRegisterPage && role === "admin" ? (
        <AdminRegister onClick={() => setIsRegisterPage(false)} />
      ) : null}
      {/* showing loader */}
      {loading ? <Loader /> : null}
      {/* showing reset password component  */}
      {resetPassword ? (
        <ForgotPasswordModal
          showModal={resetPassword}
          onClose={() => {
            setResetPassword(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
