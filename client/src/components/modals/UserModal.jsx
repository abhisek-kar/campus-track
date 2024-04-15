import React, { useState } from "react";

const UserModal = ({ onClose, handleSubmit }) => {
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

          <div className=" poppins-extrabold mb-8 text-xl text-gray-500">
            Satya Ranjan Behera
          </div>

          {/* body */}
          <div className="mb-4 ">
            <div className="mb-1">
              <span className="poppins-bold">Branch : </span>
              <span className="poppins-medium-italic">
                Computer Science & Engineering
              </span>
            </div>
            <div className="mb-1">
              <span className="poppins-bold">Email : </span>
              <span className="poppins-medium-italic">
                2001104065@gmail.com
              </span>
            </div>
            <div className="mb-1">
              <span className="poppins-bold">Year : </span>
              <span className="poppins-medium-italic">4th</span>
            </div>
            <div className="mb-1">
              <span className="poppins-bold">Semster : </span>
              <span className="poppins-medium-italic">8th</span>
            </div>
            <div className="mb-1">
              <span className="poppins-bold">Regd. No. : </span>
              <span className="poppins-medium-italic">2001104065</span>
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

export default UserModal;
