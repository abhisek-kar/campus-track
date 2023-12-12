import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const InputBox = ({ labelName, onChange, type, placeholder, value }) => {
  const [showPassword, setShowPassword] = useState(false);
  if (type !== "password") {
    return (
      <div className=" w-full">
        <label className="font-semibold text-lg text-gray-600 tracking-wide ">
          {labelName}{" "}
        </label>

        <input
          value={value}
          type={type ? type : "text"}
          onChange={onChange}
          className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide font-mono  focus:outline-0  focus:border-themeBlue"
          placeholder={placeholder ? placeholder : null}
        />
      </div>
    );
  } else {
    return (
      <div className=" w-full relative">
        <label
          htmlFor=""
          className="font-semibold text-lg  text-gray-600 tracking-wide "
        >
          {labelName}
        </label>

        <input
          value={value}
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide font-mono  focus:outline-0  focus:border-themeBlue"
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
    );
  }
};

export default InputBox;
