import React from "react";

const Modal = ({ children, onClose, showModal, widthNheight }) => {
  if (!showModal) {
    return null; // Don't render anything if the modal is closed
  }
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 flex flex-col items-center bg-themeBlue bg-opacity-20 z-[1000]">
      <div
        className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-50 bg-slate-500 flex justify-center items-center overflow-auto"
        onClick={onClose}
      >
        {" "}
        <div
          className={`bg-white  shadow-2xl shadow-gray-600 rounded-md mt-10  z-[900] ${
            widthNheight ? widthNheight : "w-2/4 h-2/4"
          } overflow-y-auto relative`}
        >
          <div className="bg-white sticky top-0  flex justify-end shadow-md mb-1 ">
            <button onClick={onClose} className="text-3xl font-bold mr-2 ">
              &times;
            </button>
          </div>
          <div className="p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
