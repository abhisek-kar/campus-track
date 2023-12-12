import React from "react";

const SubmitButton = ({ buttonName }) => {
  return (
    <button
      type="submit"
      className="  shadow-lg shadow-gray-800 rounded-full hover:bg-opacity-90 bg-themeBlue py-2 px-4   text-white font-mono font-semibold tracking-wide text-xl"
    >
      {buttonName}
    </button>
  );
};

export default SubmitButton;
