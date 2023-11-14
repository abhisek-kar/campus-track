import React from "react";

const Dropdown = ({ onChange, children }) => {
  return (
    <div>
      <select
        //   style={{ backgroundColor: "#0f7491" }}
        name=""
        id=""
        onChange={onChange}
        className="rounded-md p-3 w-full text-lg font-semibold tracking-wide mt-5 focus:outline-0 focus:border-2 focus:border-themeBlue"
      >
        {children}
      </select>
    </div>
  );
};

export default Dropdown;
