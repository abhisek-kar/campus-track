import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const InputBox = ({ labelName, onChange, type, placeholder, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (type !== "password") {
    return (
      <div className=" w-full mb-2">
        <label className="poppins-medium text-lg  tracking-wide ">
          {labelName}{" "}
        </label>

        <input
          value={value}
          type={type ? type : "text"}
          onChange={onChange}
          className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-full tracking-wide poppins-regular focus:outline-0  focus:border-themeBlue"
          placeholder={placeholder ? placeholder : null}
        />
      </div>
    );
  } else {
    return (
      <div className="mt-2 mb-3 w-full ">
        <label htmlFor="" className="poppins-medium text-lg   tracking-wide ">
          Enter Password
        </label>

        <input
          value={value}
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          className="border-[3px] border-themeBlue mt-1 p-3 rounded-md w-full tracking-wide poppins-regular focus:outline-0 focus:border-2 focus:border-themeBlue"
          placeholder={"*********"}
        />
        <div className="w-full flex justify-end -mt-9 pr-4">
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
    );
  }
};

export default InputBox;
