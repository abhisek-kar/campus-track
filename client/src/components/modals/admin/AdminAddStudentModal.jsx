import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { IoReloadOutline } from "react-icons/io5";
import API from "../../../services/API";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useAdmin } from "../../../context/adminContext";
import { useSelector } from "react-redux";

const yearOptions = ["1st", "2nd", "3rd", "4th"];
const semesterOptions = {
  "1st": ["1st", "2nd"],
  "2nd": ["3rd", "4th"],
  "3rd": ["5th", "6th"],
  "4th": ["7th", "8th"],
};
const AdminAddStudentModal = ({ onClose, edit }) => {
  const { currentStudent, setCurrentStudent } = useAdmin();
  const [showSpin, setShowSpin] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: !edit
      ? Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required")
      : Yup.string(),
    year: Yup.string().required("Year is required"),
    semester: Yup.string().required("Semester is required"),
    address: Yup.string().required("Address is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    regdNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Registartion number must be exactly 10 digits")
      .required("Registartion number is required"),
  });
  const { department } = useSelector((state) => state.auth.user);

  const handleSubmit = async (values) => {
    const userData = {
      ...values,
      role: "student",
      department: department?._id,
    };
    console.log(userData);
    try {
      const { data } = await API.post("/auth/register", userData);
      console.log(data);
      formik.handleReset();
      onClose();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const handleEditSubmit = async (values) => {
    setShowSpin(true);
    const userData = {
      ...values,
      role: "student",
      department: department?._id,
    };
    try {
      const { data } = await API.patch(
        `/student/${currentStudent?._id}`,
        userData
      );
      toast.success(data?.message);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setShowSpin(false);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: edit ? currentStudent?.name : "",
      email: edit ? currentStudent?.email : "",
      password: "",
      year: edit ? currentStudent?.year : "",
      semester: edit ? currentStudent?.semester : "",
      address: edit ? currentStudent?.address : "",
      mobile: edit ? currentStudent?.mobile : "",
      regdNo: edit ? currentStudent?.regdNo : "",
    },
    validationSchema: validationSchema,
    onSubmit: edit ? handleEditSubmit : handleSubmit,
  });

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[2147483647]">
      <div
        className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-50 bg-slate-500 flex justify-center items-center overflow-auto"
        onClick={onClose}
      >
        <div
          className="relative p-8 bg-white rounded shadow-md max-w-[90%] max-h-[90%] overflow-auto"
          //   style={{ width: "80%", minWidth: "320px", maxWidth: "452px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <Toaster />
          {/* heading */}

          <div className=" poppins-extrabold mb-8 text-xl text-gray-700">
            {!edit ? "Create A  Student" : "Edit Student Details"}
          </div>

          {/* body */}
          <div className="mb-6 ">
            <form onSubmit={formik.handleSubmit}>
              <div className="flex items-center gap-3 mb-6 justify-between">
                <label className="poppins-medium text-lg  tracking-wide">
                  Name
                </label>
                <div className="">
                  <input
                    type="text"
                    name="name"
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-96 tracking-wide poppins-medium text-gray-600 focus:outline-none "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="absolute mb-1 text-red-500 poppins-medium text-sm">
                      {formik.errors.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 justify-between">
                <label className="poppins-medium text-lg  tracking-wide">
                  Email
                </label>
                <div>
                  <input
                    type="email"
                    name="email"
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-96 tracking-wide poppins-medium text-gray-600 focus:outline-none "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className=" absolute mb-1 text-red-500 poppins-medium text-sm">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 mb-6 justify-between">
                <label className="poppins-medium text-lg  tracking-wide">
                  Regd. No
                </label>
                <div>
                  <input
                    type="text"
                    name="regdNo"
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-96 tracking-wide poppins-medium text-gray-600 focus:outline-none "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.regdNo}
                  />
                  {formik.touched.regdNo && formik.errors.regdNo && (
                    <div className=" absolute mb-1 text-red-500 poppins-medium text-sm">
                      {formik.errors.regdNo}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 justify-between">
                <label className="poppins-medium text-lg  tracking-wide">
                  Password
                </label>
                <div>
                  <input
                    type="password"
                    name="password"
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-96 tracking-wide poppins-medium text-gray-600 focus:outline-none "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="absolute mb-1 text-red-500 poppins-medium text-sm">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 justify-between">
                <label className="poppins-medium text-lg  tracking-wide">
                  Year
                </label>
                <div>
                  <select
                    name="year"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.year}
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-96 tracking-wide poppins-medium text-gray-600 focus:outline-none bg-white"
                  >
                    <option value="">Select Year</option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {formik.touched.year && formik.errors.year && (
                    <div className="absolute mb-1 text-red-500 poppins-medium text-sm">
                      {formik.errors.year}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 justify-between">
                <label className="poppins-medium text-lg  tracking-wide">
                  Semester
                </label>
                <div>
                  <select
                    name="semester"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.semester}
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-96 tracking-wide poppins-medium text-gray-600 focus:outline-none bg-white "
                  >
                    <option value="">Select Semester</option>
                    {formik.values.year &&
                      semesterOptions[formik.values.year].map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                  </select>
                  {formik.touched.semester && formik.errors.semester && (
                    <div className="absolute mb-1 text-red-500 poppins-medium text-sm">
                      {formik.errors.semester}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 justify-between">
                <label className="poppins-medium text-lg  tracking-wide">
                  Address
                </label>
                <div>
                  {" "}
                  <input
                    type="text"
                    name="address"
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-96 tracking-wide poppins-medium text-gray-600 focus:outline-none "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="absolute mb-1 text-red-500 poppins-medium text-sm">
                      {formik.errors.address}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 justify-between">
                <label className="poppins-medium text-lg  tracking-wide">
                  Mobile No
                </label>
                <div>
                  <input
                    type="text"
                    name="mobile"
                    className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-96 tracking-wide poppins-medium text-gray-600 focus:outline-none "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mobile}
                  />
                  {formik.touched.mobile && formik.errors.mobile && (
                    <div className="absolute mb-1 text-red-500 poppins-medium text-sm">
                      {formik.errors.mobile}
                    </div>
                  )}
                </div>
              </div>

              {/* footer */}
              <div className="flex justify-between gap-3 mt-10 ">
                <button
                  className="px-2 py-1 w-24 poppins-medium rounded text-themeBlue hover:opacity-80 border-themeBlue border-2 flex items-center gap-2"
                  onClick={formik.handleReset}
                  type="button"
                >
                  <IoReloadOutline className="text-xl" />
                  Reset
                </button>
                <div className="flex  gap-3">
                  <button
                    className="px-2 py-1 w-24 poppins-medium rounded text-themeBlue hover:opacity-80 border-themeBlue border-2"
                    onClick={onClose}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-2 py-1 w-24 poppins-medium rounded bg-themeBlue hover:opacity-80 text-white"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddStudentModal;
