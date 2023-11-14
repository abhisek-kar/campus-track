import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BiSolidDownArrow,
  BiSolidUpArrow,
  BiSolidRightArrowAlt,
} from "react-icons/bi";
import { ReactComponent as College } from "../assets/svg/College.svg";

let roles = [{ role: "Student" }, { role: "Faculty" }, { role: "Admin" }];

const HomePage = () => {
  const navigate = useNavigate();
  const [showAllLogins, setShowAllLogins] = useState(false);
  useEffect(() => {
    // setShowAllLogins(false);
  });

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
      <div className="flex justify-between items-center relative">
        {/* brand name */}
        <Link
          to={"/"}
          className="text-2xl font-bold tracking-wider p-2 flex  justify-center items-center"
        >
          CAMPUS TRACK{" "}
        </Link>
        {/* login buttons */}

        {!showAllLogins ? (
          <div className="w-32 mr-2 flex items-center justify-between gap-1  bg-themeBlue text-white py-1 px-2 rounded-sm">
            <span className="font-semibold text-xl ">Login</span>
            <BiSolidDownArrow
              className="cursor-pointer"
              onClick={(e) => setShowAllLogins(true)}
            />
          </div>
        ) : (
          <div className=" absolute right-2 top-2 shadow-xl shadow-gray-800">
            <div className="w-32 flex items-center justify-between gap-1 bg-themeBlue text-white py-1 px-2 rounded-sm">
              <span className="font-semibold text-white text-xl ">Login</span>
              <BiSolidUpArrow
                className="cursor-pointer "
                onClick={(e) => setShowAllLogins(false)}
              />
            </div>
            {roles.map((item, idx) => {
              return (
                <div
                  onClick={(e) => {
                    navigate(`/login?role=${item.role}`);
                  }}
                  className="w-32 flex items-center justify-between gap-1 cursor-pointer  hover:text-white hover:bg-themeBlue py-1 px-2 rounded-sm "
                >
                  <span className="font-semibold text-xl ">{item.role}</span>
                  <BiSolidRightArrowAlt className="" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* body */}
      <div className=" flex justify-center items-center">
        <College className="w-[60%]" />
      </div>
    </div>
  );
};

export default HomePage;
