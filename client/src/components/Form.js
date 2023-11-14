import React from "react";

const Form = ({ children }) => {
  return (
    <div className="flex flex-col justify-center  items-center mt-20 ">
      <form className="flex w-96 flex-col gap-6 shadow-2xl shadow-themeBlue rounded-md p-2 ">
        <h1 className="text-center font-semibold text-3xl mb-4  border-b border-gray-500">
          Share OTP Details
        </h1>
        {children}
      </form>
    </div>
  );
};

export default Form;
