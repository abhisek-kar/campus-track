import React, { useState } from "react";
import InputBox from "./../../components/InputBox";
import { toast } from "react-hot-toast";
import SubmitButton from "../../components/buttons/SubmitButton";

const year = ["1st", "2nd", "3rd", "4th"];
const semesterOptions = {
  "1st": ["1st", "2nd"],
  "2nd": ["3rd", "4th"],
  "3rd": ["5th", "6th"],
  "4th": ["7th", "8th"],
};

const AdminAddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [regdNo, setRegdNo] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const handleAddStudent = async () => {
    if (
      !name ||
      !email ||
      !regdNo ||
      !academicYear ||
      !semester ||
      !enrollmentDate ||
      !address
    ) {
      return toast.error("Please Fill All the fields");
    }
    console.log({
      name,
      email,
      regdNo,
      academicYear,
      semester,
      enrollmentDate,
      address,
    });
  };
  return (
    <form className="mt-3 px-3" onSubmit={handleAddStudent}>
      <div className="mt-3 display grid grid-cols-2 gap-5">
        {/* student name */}
        <div>
          <InputBox
            labelName={"Student Name"}
            placeholder={"e.g Satya Ranjan Behera"}
            type={"text"}
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        {/* student email */}
        <div>
          <InputBox
            labelName={"Student Email"}
            placeholder={"e.g 2001104107@gcekjr.ac.in"}
            type={"email"}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        {/* student regd No */}
        <div>
          <InputBox
            labelName={"Registration No."}
            placeholder={"e.g 2001104065"}
            type={"number"}
            value={regdNo}
            onChange={({ target }) => setRegdNo(target.value)}
          />
        </div>

        {/* student mobile no */}
        <div>
          <InputBox
            labelName={"Mobile No."}
            placeholder={"e.g +918093897165"}
            type={"number"}
            value={mobile}
            onChange={({ target }) => setMobile(target.value)}
          />
        </div>
        {/* student Academic Year */}
        <div className="w-full mt-2">
          <label
            htmlFor="yr-dropdown"
            className="w-full font-semibold text-lg text-gray-600 tracking-wide "
          >
            Current Academic Year
          </label>
          <select
            id="yr-dropdown"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full font-semibold  text-gray-600 tracking-wide font-mono  outline-none  border-themeBlue border-[3px] rounded-md  p-3 mt-1"
          >
            <option value="">select</option>
            {year &&
              year.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        {/* student Academic semester */}
        <div className="w-full mt-2">
          <label
            htmlFor="dropdown"
            className="w-full font-semibold text-lg text-gray-600 tracking-wide "
          >
            Semester
          </label>
          <select
            id="dropdown"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full font-semibold  text-gray-600 tracking-wide font-mono  outline-none  border-themeBlue border-[3px] rounded-md  p-3 mt-1"
          >
            <option value="">select</option>
            {academicYear ? (
              semesterOptions[academicYear]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            ) : (
              <option disabled>Please select an academic year first</option>
            )}
          </select>
        </div>

        {/* student address */}
        <div>
          <InputBox
            labelName={"Residential Address"}
            placeholder={"e.g Gunidola G.Nahalpur"}
            type={"text"}
            value={address}
            onChange={({ target }) => setAddress(target.value)}
          />
        </div>
        {/* student enrollment date */}
        <div>
          <InputBox
            labelName={"Enrollment Date"}
            type={"date"}
            value={enrollmentDate}
            onChange={({ target }) => setEnrollmentDate(target.value)}
          />
        </div>
      </div>
      <div className="mt-5 w-full  flex flex-row-reverse">
        <SubmitButton buttonName={"Add Student"} />
      </div>
    </form>
  );
};

export default AdminAddStudent;
