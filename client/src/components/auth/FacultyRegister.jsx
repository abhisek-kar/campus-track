import React, { useState } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import InputBox from "../InputBox";

let branches = ["Cse", "Mining", "Civil", "Mechanical", "Electrical"];
const FacultyRegister = ({ onClick }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" min-h-screen w-full flex flex-col  justify-center items-center p-3 "
      style={{ backgroundColor: "white" }}
    >
      <div className=" font-mono text-2xl mt-1 mb-5 font-semibold tracking-wider text-gray-700 border-b-2 border-gray-600">
        Faculty SignUp
      </div>
      <InputBox
        placeholder={"e.g Mr Xavier"}
        labelName={"Your Name"}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <InputBox
        placeholder={"e.g xyz@gmail.com"}
        labelName={"Your Email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <InputBox
        placeholder={"e.g 8093XXXX71"}
        labelName={"Your Mobile No"}
        type={"number"}
        value={mobile}
        onChange={(e) => {
          setMobile(e.target.value);
        }}
      />
      {/* password */}
      <InputBox
        type={"password"}
        labelName={"Enter Password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {/* confirm Password */}
      <InputBox
        type={"password"}
        labelName={"Confirm Password"}
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      {/* branch */}

      <div className="w-full">
        <label
          htmlFor="x"
          className=" font-semibold text-lg text-gray-600 tracking-wide "
        >
          Choose Branch
        </label>
        <select
          id="x"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className={` w-full font-semibold  text-gray-600 tracking-wide font-mono  outline-none  border-themeBlue border-[3px] rounded-md  p-3 mt-1`}
        >
          <option value="">select</option>
          {branches &&
            branches.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
        </select>
      </div>

      {/* submit button */}
      <button
        type="submit"
        className="w-full mt-5 flex items-center justify-center shadow-lg shadow-gray-800 rounded-full hover:bg-opacity-90 bg-themeBlue p-2   text-white font-mono font-semibold tracking-wide text-xl"
      >
        <span className="flex-1 text-center">Regsiter</span>
        <FiArrowRightCircle className="mr-3" />
      </button>
      <div className="mt-3 text-themeBlue">
        Already Registered?{" "}
        <span className="font-semibold cursor-pointer " onClick={onClick}>
          please Login
        </span>
      </div>
    </form>
  );
};

export default FacultyRegister;
