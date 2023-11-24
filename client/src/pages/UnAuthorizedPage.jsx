import React from "react";
import { ReactComponent as UnAuthorizedpage } from "../assets/svg/UnAuthorized.svg";

const UnAuthorizedPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <UnAuthorizedpage className="w-full h-full" />
      </div>
    </>
  );
};

export default UnAuthorizedPage;
