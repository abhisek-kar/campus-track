import React, { useEffect, useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ReactComponent as LoginSVG } from "../../../assets/svg/Login.svg";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./../../../components/Loader";
import ForgotPasswordModal from "./../../../components/modals/ForgotPasswordModal";
import { loginUser } from "./../../../redux/auth/authSlices";
import InputBox from "./../../../components/InputBox";

const roles = ["student", "faculty", "admin"];
const Login = () => {
  const dispatch = useDispatch();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [resetPassword, setResetPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mail || !password) {
      toast.error("All fields are mandatory", { duration: 2000 });
      return;
    }
    dispatch(loginUser({ mail, password, role }));
    setMail("");
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
      <form
        onSubmit={handleSubmit}
        className=" min-h-screen w-full flex flex-col  justify-center items-center p-3 "
        style={{ backgroundColor: "white" }}
      >
        <div className="poppins-medium text-2xl mb-10 ">Please Login !</div>
        {/* roles */}
        <div className="flex gap-5 mb-5">
          {roles?.map((item) => {
            return (
              <label
                className="poppins-medium text-lg inline-flex items-center gap-2 "
                key={item}
              >
                <input
                  type="radio"
                  value={item}
                  checked={role === item}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-themeBlue h-5 w-5 text-themeBlue focus:ring-themeBlue bg-themeBlue "
                />
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            );
          })}
        </div>
        <InputBox
          placeholder={"e.g xyz@gmail.com"}
          labelName={"Your Email"}
          value={mail}
          onChange={(e) => {
            setMail(e.target.value);
          }}
        />

        <InputBox
          type={"password"}
          placeholder={"*********"}
          labelName={"Enter Password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <div className=" w-full flex justify-end mr-5 mt-2 mb-10">
          <Link
            className="text-themeBlue poppins-medium-italic "
            onClick={() => setResetPassword(true)}
          >
            Forgot Password?
          </Link>
        </div>
        {/* submit button */}
        <button
          type="submit"
          className="w-full  flex items-center justify-center shadow-lg shadow-gray-800 rounded-full hover:bg-opacity-90 bg-themeBlue p-2   text-white poppins-medium tracking-wide text-xl"
        >
          <span className="flex-1 text-center">Login</span>
          <FiArrowRightCircle className="mr-3" />
        </button>
        {/* <div className="mt-3 text-themeBlue poppins-regular">
            Not Registered Yet?{" "}
            <span
              className="font-semibold poppins-medium cursor-pointer "
              onClick={(e) => setIsRegisterPage(true)}
            >
              please Sign Up
            </span>
          </div> */}
      </form>

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
