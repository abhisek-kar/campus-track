import React from "react";

const Dropdown = ({ labelName, value, onChange, width, data }) => {
  return (
    <div className="flex flex-col mb-2">
      <label className=" font-semibold text-lg text-gray-600 tracking-wide ">
        {labelName}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={` ${
          width ? width : "w-full"
        } font-semibold  text-gray-600 tracking-wide font-mono  outline-none  border-themeBlue border-[3px] rounded-md  p-2 mt-1`}
      >
        <option value="">select</option>
        {data &&
          data.map((item, index) => {
            return (
              <option key={index} value={data[index][0]}>
                {data[index][1]}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Dropdown;
