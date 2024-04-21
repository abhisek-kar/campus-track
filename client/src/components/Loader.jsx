import React from "react";
import { FadeLoader, ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 flex justify-center items-center min-h-screen bg-opacity-70 bg-white z-[2147483647]">
      <ScaleLoader color="#0f7491" size={60} speedMultiplier={1} />
    </div>
  );
};

export default Loader;

export function Spinner() {
  return (
    <div>
      <FadeLoader color="#0f7491" size={60} speedMultiplier={1} />
    </div>
  );
}
