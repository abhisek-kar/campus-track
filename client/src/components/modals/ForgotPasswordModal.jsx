import React, { useState } from "react";
import Modal from "./Modal";
import InputBox from "../InputBox";
import OtpBox from "../OtpBox";
import { toast } from "react-hot-toast";

const ForgotPasswordModal = ({ showModal, onClose }) => {
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
    <div>
      <Modal showModal={showModal} onClose={onClose}>
        <div className="flex flex-col items-center justify-center h-full w-full ">
          {showOtp ? (
            <div className="w-4/5">
              <OtpBox />
              <button
                onClick={handleVerifyCode}
                type="submit"
                className=" w-full mt-10 flex items-center justify-center  rounded-md hover:bg-opacity-90 bg-themeBlue p-2   text-white font-mono font-semibold tracking-wide "
              >
                Verify Code
              </button>
              <div className="text-themeBlue  font-medium  flex flex-row-reverse">
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
                className="w-full flex items-center justify-center  rounded-md hover:bg-opacity-90 bg-themeBlue p-2   text-white font-mono font-semibold tracking-wide "
              >
                Send Verification Code
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ForgotPasswordModal;
