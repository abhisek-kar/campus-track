import React, { useState } from "react";
import Modal from "./Modal";
import InputBox from "../InputBox";
import OtpBox from "../OtpBox";
import { toast, Toaster } from "react-hot-toast";

const ForgotPasswordModal = ({ onClose }) => {
  const [showOtp, setShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const handleSendVerificationCode = async () => {
    if (!email) {
      return toast.error("Please Provide Email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return toast.error("Enter a Valid Email");
    }
    setShowOtp(true);
    return toast.success("Verification code sent successfully");
  };
  const handleVerifyCode = () => {};
  const handleResendCode = () => {
    return toast.success("Code Sent Successfully");
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
          style={{ width: "50%", height: "40%" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center h-full w-full ">
            {showOtp ? (
              <div className="w-4/5">
                <OtpBox />
                <button
                  onClick={handleVerifyCode}
                  type="submit"
                  className=" w-full mt-10 flex items-center justify-center  rounded-md hover:bg-opacity-90 bg-themeBlue p-2   text-white poppins-medium tracking-wide "
                >
                  Verify Code
                </button>
                <div className="text-themeBlue  poppins-medium mt-2 flex flex-row-reverse">
                  <span onClick={handleResendCode} className="cursor-pointer">
                    Resend Code
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-4/5">
                <div className=" mb-5">
                  <InputBox
                    placeholder={"Enter Your Mail"}
                    type={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSendVerificationCode}
                  type="submit"
                  className="w-full flex items-center justify-center  rounded-md hover:bg-opacity-90 bg-themeBlue p-2   text-white poppins-medium tracking-wide "
                >
                  Send Verification Code
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
