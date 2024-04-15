import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserModal from "./modals/LogoutModal";
import LogOutModal from "./modals/LogoutModal";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../features/auth/authSlice";

const SideBar = ({ data, role }) => {
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <div className="h-full px-4  bg-white   fixed  z-50 ">
      {/* brand name */}
      <div className="w-full pt-5 text-center mb-10">
        <Link to={"/"} className="text-xl poppins-bold tracking-wide block ">
          CAMPUS TRACK{" "}
        </Link>
        <span className="poppins-bold-italic text-sm bg-slate-300 px-2 py-1 rounded-full tracking-wide t">
          {role}
        </span>
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
          onClick={() => setShowUserModal(true)}
          className=" absolute bottom-10 py-2 left-1  bg-red-600 hover:opacity-90 poppins-medium text-white  p-1 rounded-full w-48 "
        >
          Logout
        </button>
      </div>
      {showUserModal ? (
        <LogOutModal
          handleSubmit={(e) => {
            dispatch(clear());
            navigate("/");
          }}
          onClose={() => setShowUserModal(false)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SideBar;
