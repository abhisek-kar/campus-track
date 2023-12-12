import React, { useState } from "react";

const OtpBox = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (index, value, e) => {
    const newOtp = [...otp];

    if (e.key === "Backspace" && index > 0) {
      // If Backspace is pressed and not in the first box, move focus to the previous box
      document.getElementById(`otp-input-${index - 1}`).focus();
      newOtp[index] = "";
    } else if (e.key === "Backspace" && index === 0) {
      newOtp[index] = "";
    } else {
      // Allow only numbers as input
      const isValidInput = /^[0-9]$/.test(value);

      if (isValidInput) {
        newOtp[index] = value;

        // Move focus to the next input if the current box is not the last one
        if (index < otp.length - 1 && value !== "") {
          document.getElementById(`otp-input-${index + 1}`).focus();
        }
      }
    }

    setOtp(newOtp);
  };

  return (
    <div className="flex justify-center items-center mt-5">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleInputChange(index, e.target.value, e)}
          onKeyDown={(e) => handleInputChange(index, digit, e)}
          className="w-1/6 h-12 mx-[2%] outline-none border-b-2 border-themeBlue focus:border-b-4 text-center text-xl"
          autoFocus={index === 0}
          autoComplete="off"
        />
      ))}
    </div>
  );
};

export default OtpBox;
