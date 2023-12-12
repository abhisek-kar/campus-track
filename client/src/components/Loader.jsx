import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 flex justify-center items-center min-h-screen bg-opacity-90 bg-white">
      <ScaleLoader color="#0f7491" size={60} speedMultiplier={1} />
    </div>
  );
};

export default Loader;
