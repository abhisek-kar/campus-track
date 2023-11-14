import React from "react";

const GeneralButton = ({ buttonName, onClick }) => {
  return (
    <div>
      <button
        className={`p-2 m-2 text-lg font-semibold tracking-wide bg-pink-300 rounded-md mx-2`}
        onClick={onClick}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default GeneralButton;
