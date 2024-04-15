import React, { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";

const StudentAssignmentModal = ({ onClose }) => {
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

          <div className=" poppins-bold mb-8 text-xl text-gray-700">
            Assignment
          </div>

          {/* body */}
          <div className="mb-4 flex gap-2 items-center">
            <div className="poppins-medium text-lg"> Download document</div>
            <FaRegFilePdf className="text-red  w-5 h-5 cursor-pointer" />
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

export default StudentAssignmentModal;
