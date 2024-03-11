import React from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const SideBar = ({ data }) => {
  let location = useLocation();
  let navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="h-full px-4  bg-white   fixed  z-50 ">
      {/* brand name */}
      <div className="text-xl font-bold tracking-wider pt-5 text-center mb-10">
        <Link to={"/"}>CAMPUS TRACK</Link>
      </div>
      {/* sidebar links */}
      <div className="flex flex-col items-center  ">
        {data.map((item, idx) => {
          return (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(item.link.replace(":id", id).replace(/\/$/, ""));
              }}
              key={idx}
              className={`my-3  ${
                location.pathname ===
                item.link.replace(":id", id).replace(/\/$/, "")
                  ? "bg-themeBlue text-white"
                  : "bg-gray-300 text-gray-700 "
              }
               
                   hover:bg-themeBlue hover:text-white p-2 rounded-full w-full `}
            >
              <div className="flex tracking-wider font-mono text-base font-bold ">
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
      <div className="absolute w-[90%] bottom-[5%] left-3 ">
        <button
          onClick={(e) => {
            window.location.replace("/");
          }}
          className="   bg-red-500 hover:bg-red-400 font-semibold text-lg p-1 rounded-full w-full "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
