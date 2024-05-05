import React, { useState } from "react";
import OtpBox from "../OtpBox";
import { toast, Toaster } from "react-hot-toast";
import API from "../../services/API";
import Loader from "../Loader";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import OtpInput from "react-otp-input";
import { useAdmin } from "../../context/adminContext";
import { Password } from "@mui/icons-material";

const roles = ["student", "faculty", "admin"];

const ForgotPasswordModal = ({ onClose }) => {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [showSpin, setShowSpin] = useState(false);
  const { otpVal, setOtpVal } = useAdmin();

  //
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendVerificationCode = async () => {
    if (!email) {
      return toast.error("Please Provide Email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error("Enter a Valid Email");
    }
    setShowSpin(true);
    try {
      const otpData = {
        role,
        email,
      };
      console.log(otpData);
      const { data } = await API.patch("/auth/otp-request", otpData);
      console.log(data);
      setShowOtp(true);
      return toast.success(data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setShowSpin(false);
    }
  };
  const handleResetPassword = async () => {
    if (!email || !Password || !newPassword || !otpVal || !confirmNewPassword) {
      return toast.error("All fields are required");
    }
    if (otpVal.length === 0) {
      return toast.error("please provide the otp");
    }
    if (newPassword !== confirmNewPassword) {
      return toast.error("passwords do not match");
    }
    try {
      setShowSpin(true);
      const resetData = {
        email,
        otp: otpVal,
        newPassword,
        role,
      };
      console.log(resetData);
      const { data } = await API.patch("/auth/reset-password", resetData);
      console.log(data);
      onClose();
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setShowSpin(false);
    }
  };
  const handleResendCode = async () => {
    setShowSpin(true);
    try {
      const otpData = {
        role,
        email,
      };
      console.log(otpData);
      const { data } = await API.patch("/auth/otp-request", otpData);
      console.log(data);
      setShowOtp(true);
      return toast.success("otp resent successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setShowSpin(false);
    }
  };
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[2147483647]">
      <Toaster />
      <div
        className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-50 bg-slate-500 flex justify-center items-center overflow-auto"
        onClick={onClose}
      >
        <div
          className="relative p-6 bg-white rounded shadow-md max-w-[90%] max-h-[90%] overflow-auto"
          style={{ width: "50%", height: "75%" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center h-full w-full ">
            {showOtp ? (
              <div className="w-4/5">
                <div className="relative w-full flex flex-col mb-5">
                  <label className="poppins-medium text-lg tracking-wide">
                    Enter New Password
                  </label>
                  <input
                    // name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide poppins-regular focus:outline-none focus:border-themeBlue"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
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
                <div className="relative w-full flex flex-col mb-5 ">
                  <label className="poppins-medium text-lg tracking-wide">
                    Confirm Password
                  </label>
                  <input
                    // name="password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide poppins-regular focus:outline-none focus:border-themeBlue"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    value={confirmNewPassword}
                  />
                  <div className="absolute top-[45px] right-4">
                    {showConfirmPassword ? (
                      <AiFillEye
                        className="w-5 h-5 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <AiFillEyeInvisible
                        className="w-5 h-5 cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )}
                  </div>
                </div>

                <OtpBox />
                <button
                  onClick={handleResetPassword}
                  type="submit"
                  className=" w-full mt-16 flex items-center justify-center  rounded-md hover:bg-opacity-90 bg-themeBlue p-2   text-white poppins-medium tracking-wide "
                >
                  Reset Password
                </button>
                <div className="text-themeBlue  poppins-medium mt-2 flex flex-row-reverse">
                  <span onClick={handleResendCode} className="cursor-pointer">
                    Resend Code
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-4/5">
                <label className="poppins-medium text-lg tracking-wide mb-5">
                  Select Your Role :
                </label>
                <div className="flex items-center justify-center gap-5 mb-8">
                  {roles.map((item) => (
                    <label
                      key={item}
                      className="poppins-medium text-lg inline-flex items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="role"
                        value={item}
                        checked={item === role}
                        onChange={(e) => setRole(e.target.value)}
                        className="form-radio h-5 w-5 text-themeBlue focus:ring-themeBlue"
                      />
                      <span className="ml-2">
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="w-full flex flex-col mb-5">
                  <label className="poppins-medium text-lg tracking-wide">
                    Enter Your Mail
                  </label>
                  <input
                    name="email"
                    type="text"
                    placeholder="e.g xyz@gmail.com"
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide poppins-regular focus:outline-none focus:border-themeBlue"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <button
                  onClick={handleSendVerificationCode}
                  className="w-full flex items-center justify-center  rounded-md hover:bg-opacity-90 bg-themeBlue p-2   text-white poppins-medium tracking-wide "
                >
                  Send Verification Code
                </button>
              </div>
            )}
            {showSpin && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
