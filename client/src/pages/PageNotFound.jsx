import React from "react";
import { ReactComponent as Pagenotfound } from "../assets/svg/PageNotFound.svg";

const PageNotFound = () => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <Pagenotfound className="w-full h-full" />
      </div>
    </>
  );
};

export default PageNotFound;
