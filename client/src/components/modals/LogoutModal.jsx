import React, { useState } from "react";

const LogOutModal = ({ onClose, handleSubmit }) => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[2147483647]">
      <div
        className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-50 bg-slate-500 flex justify-center items-center overflow-auto"
        onClick={onClose}
      >
        <div
          className="relative p-6 bg-white rounded shadow-md max-w-[90%] max-h-[90%] overflow-auto"
          style={{ width: "80%", minWidth: "320px", maxWidth: "452px" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* heading */}

          <div className=" poppins-extrabold mb-8">Are you sure to logout?</div>

          {/* body */}
          <div className="mb-4"></div>
          {/* footer */}
          <div className="flex justify-between mt-3 ">
            <div className="flex gap-4 ml-auto">
              <button
                className="px-2 py-1 w-24 poppins-medium rounded bg-green-600 hover:opacity-80 text-white"
                onClick={onClose}
              >
                No
              </button>
              <button
                onClick={handleSubmit}
                className="px-2 py-1 w-24 poppins-medium rounded bg-red-600 hover:opacity-80 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
