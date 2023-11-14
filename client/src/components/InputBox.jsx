import React, { useState } from "react";

const InputBox = ({ labelName, onChange, type, placeholder, value }) => {
  return (
    <div className="mt-2 w-full">
      <label className="font-semibold text-lg text-gray-600 tracking-wide ">
        {labelName}{" "}
      </label>

      <input
        value={value}
        type={type ? type : "text"}
        onChange={onChange}
        className=" border-[3px] border-themeBlue mt-1 p-3 rounded-md w-full tracking-wide font-mono  focus:outline-0 focus:border-2 focus:border-themeBlue"
        style={{ outline: "none" }}
        placeholder={placeholder ? placeholder : null}
      />
    </div>
  );
};

export default InputBox;
