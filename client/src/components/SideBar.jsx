import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = ({ data }) => {
  let location = useLocation();
  let navigate = useNavigate();

  return (
    <div className="h-full px-4  bg-white   fixed  z-50 ">
      {/* brand name */}
      <div className=" pt-5 text-center mb-10">
        <Link to={"/"} className="text-xl poppins-bold tracking-wide ">
          CAMPUS TRACK{" "}
        </Link>
      </div>
      <div className="flex flex-col justify-between gap-36 py-2">
        {/* sidebar links */}
        <div className="flex flex-col items-center  ">
          {data.map((item, idx) => {
            return (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(item.link);
                }}
                key={idx}
                className={`my-3  ${
                  location.pathname === item.link
                    ? "bg-themeBlue text-white"
                    : "bg-gray-300 text-gray-700 "
                }
               
                   hover:bg-themeBlue hover:text-white p-2 rounded-full w-full `}
              >
                <div className="flex tracking-wider poppins-medium ">
                  <div className="w-1/4 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="w-3/4 flex items-center justify-start">
                    {item.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {/* logout button */}

        <button
          onClick={(e) => {
            window.location.replace("/");
          }}
          className="   bg-red-600 hover:opacity-90 poppins-medium text-white text-lg p-1 rounded-full w-full "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
