import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as College } from "../assets/svg/College.svg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className=""
      style={{
        display: "grid",
        gridTemplateRows: "50px 1fr",
        height: "100vh",
      }}
    >
      {/* header */}
      <div className="flex justify-between items-center px-5">
        {/* brand name */}
        <Link
          to={"/"}
          className="text-2xl poppins-bold tracking-wide  flex  justify-center items-center"
        >
          CAMPUS TRACK{" "}
        </Link>
        {/* login buttons */}
        <button
          onClick={() => navigate("/login")}
          className="bg-themeBlue hover:opacity-80 py-1 px-2 text-white poppins-medium text-xl tracking-wide rounded"
        >
          Login
        </button>
      </div>

      {/* body */}
      <div className=" flex justify-center items-center">
        <College className="w-[60%]" />
      </div>
    </div>
  );
};

export default HomePage;
