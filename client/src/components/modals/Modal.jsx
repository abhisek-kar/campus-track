import React from "react";

const Modal = ({ children, onClose, showModal, widthNheight }) => {
  if (!showModal) {
    return null; // Don't render anything if the modal is closed
  }
  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 flex flex-col items-center bg-gray-700 bg-opacity-40">
      <div
        className={`bg-white  shadow-2xl shadow-gray-600 rounded-md mt-10  ${
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
  );
};

export default Modal;
