import React, { useState } from "react";
import { useSelector } from "react-redux";

const FacultyDetailsModal = ({ onClose, handleSubmit }) => {
  const { user } = useSelector((state) => state?.auth);
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[2147483647]">
      <div
        className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-50 bg-slate-500 flex justify-center items-center overflow-auto"
        onClick={onClose}
      >
        <div
          className="relative p-6 bg-white rounded shadow-md max-w-[90%] max-h-[90%] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* heading */}

          <div className=" poppins-extrabold mb-8 text-xl text-gray-500">
            {user?.name}
          </div>

          {/* body */}
          <div className="mb-4 ">
            <div className="mb-1">
              <span className="poppins-bold">Department : </span>
              <span className="poppins-medium-italic">
                {user?.department?.name}
              </span>
            </div>
            <div className="mb-1">
              <span className="poppins-bold">Email : </span>
              <span className="poppins-medium-italic">{user?.email}</span>
            </div>

            <div className="mb-1">
              <span className="poppins-bold">Mobile No. : </span>
              <span className="poppins-medium-italic">{user?.mobile}</span>
            </div>
          </div>
          {/* footer */}
          <div className="flex justify-end mt-3 ">
            <button
              className="px-2 py-1 w-24 poppins-medium rounded bg-themeBlue hover:opacity-80 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDetailsModal;
