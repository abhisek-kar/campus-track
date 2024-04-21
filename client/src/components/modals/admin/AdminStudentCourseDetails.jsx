import React, { useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useAdmin } from "../../../context/adminContext";
import API from "../../../services/API";
import Multiselect from "multiselect-react-dropdown";
import toast, { Toaster } from "react-hot-toast";

const AdminStudentCourseDetails = ({ onClose }) => {
  const { currentStudent, setCurrentStudent } = useAdmin();
  const [studentAssignedCourses, setStudentAssignedCourses] = useState([]);
  const [listOfAvailableCourses, setListOfAvailableCourses] = useState([]);
  const [selectedAssignCourses, setSelectedAssignCourses] = useState([]);
  const [selectedRevokeCourses, setSelectedRevokeCourses] = useState([]);

  const actionOptions = [
    ["assigned-courses", "Assigned Courses"],
    ["assign-course", "Assign New Course"],
    ["revoke-course", "Revoke Existing Course"],
  ];
  const [action, setAction] = useState(actionOptions[0][0]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/course");
        setListOfAvailableCourses(data?.courses);
        console.log(data?.courses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(
          `/course/assigned-courses/${currentStudent?._id}`
        );
        setStudentAssignedCourses(data?.courses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, [action]);
  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedAssignCourses.length === 0) {
      return toast.error("please select a course");
    }
    const courseData = {
      studentId: currentStudent?._id,
      courseIds: selectedAssignCourses?.map((course) => course._id),
    };
    console.log(courseData);
    try {
      const { data } = await API.patch("/attendance/add-courses", courseData);
      console.log(data);
      setSelectedAssignCourses([]);
      toast.success("course(s) assigned successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleRevokeSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedRevokeCourses.length === 0) {
      return toast.error("please select a course");
    }
    if (
      !window.confirm(
        "All attendances of this subjects will vanish, Are you sure you want to proceed?"
      )
    ) {
      return; // User clicked Cancel, so exit the function
    }
    const courseData = {
      studentId: currentStudent?._id,
      courseIds: selectedRevokeCourses?.map((course) => course._id),
    };
    console.log(courseData);
    try {
      const { data } = await API.patch("/attendance/revoke-course", courseData);
      console.log(data);
      setSelectedRevokeCourses([]);
      toast.success("course(s) revoked successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[2147483647]">
      <div
        className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-50 bg-slate-500 flex justify-center items-center overflow-auto"
        onClick={onClose}
      >
        <div
          className="relative p-8 bg-white rounded shadow-md max-w-[90%] max-h-[90%] overflow-auto"
          style={{ width: "80%", height: "80%" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* heading */}
          <Toaster />
          <div className="mb-10">
            <span className=" poppins-bold-italic mb-8 text-xl text-gray-700">
              {currentStudent?.name}
            </span>
            <span className=" ml-2 poppins-bold-italic mb-8 text-xl text-gray-600">
              Course Details
            </span>
          </div>

          {/* body */}
          <div className="mb-6 ">
            <div>
              {/* radio button */}
              <div className="flex gap-5 w-full justify-center">
                {actionOptions.map(([value, label]) => (
                  <div key={value}>
                    <label className="poppins-medium text-lg flex gap-1">
                      <input
                        type="radio"
                        id={value}
                        name="action"
                        value={value}
                        checked={action === value}
                        onChange={(e) => setAction(e.target.value)}
                        // onBlur={formik.handleBlur}
                        className="w-4"
                      />
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="my-5">
                {action === actionOptions[0][0] && (
                  <div className="mt-5">
                    <div
                      className="px-2 rounded py-1 bg-themeBlue w-full mx-5 my-1 grid poppins-medium text-white  "
                      style={{ gridTemplateColumns: "1fr 2fr 4fr " }}
                    >
                      <span>Serial No.</span>
                      <span className="">Course ID</span>
                      <span className="">Course Name</span>
                    </div>
                    {studentAssignedCourses?.map((course, idx) => {
                      return (
                        <div
                          key={idx}
                          className="px-2 rounded py-1 bg-themeBlue bg-opacity-90 w-full mx-5 my-1 grid  items-center poppins-medium text-white  "
                          style={{ gridTemplateColumns: "1fr 2fr 4fr " }}
                        >
                          <span>{idx + 1}</span>
                          <span className="">{course?.code}</span>
                          <span className="">{course?.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {action === actionOptions[1][0] && (
                  <div>
                    <div className="">
                      <label className="poppins-medium text-lg mb-2 tracking-wide">
                        Choose Course{"(s)"}
                      </label>
                      <div>
                        <Multiselect
                          className=""
                          options={listOfAvailableCourses.filter(
                            (item1) =>
                              !studentAssignedCourses.find(
                                (item2) => item2._id === item1._id
                              )
                          )}
                          displayValue="name"
                          onSelect={(selectedList, selectedItem) => {
                            console.log(selectedList);
                            setSelectedAssignCourses([...selectedList]);
                          }}
                          onRemove={(selectedList, removedItem) => {
                            setSelectedAssignCourses([...selectedList]);
                          }}
                          selectedValues={selectedAssignCourses}
                        />
                      </div>
                    </div>
                    <div className="absolute right-10 bottom-10 flex justify-end gap-3 mt-auto ">
                      <button
                        className="px-2 py-1 w-24 poppins-medium rounded text-themeBlue hover:opacity-80 border-themeBlue border-2"
                        onClick={onClose}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="px-2 py-1 w-24 poppins-medium rounded bg-themeBlue hover:opacity-80 text-white"
                        type="button"
                        onClick={handleAssignSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
                {action === actionOptions[2][0] && (
                  <div className="">
                    <div>
                      <div className="">
                        <label className="poppins-medium text-lg mb-2 tracking-wide">
                          Assigned Course{"(s)"}
                        </label>
                        <div>
                          <Multiselect
                            className=""
                            options={studentAssignedCourses}
                            displayValue="name"
                            onSelect={(selectedList, selectedItem) => {
                              setSelectedRevokeCourses([...selectedList]);
                            }}
                            onRemove={(selectedList, removedItem) => {
                              setSelectedRevokeCourses([...selectedList]);
                            }}
                            selectedValues={selectedRevokeCourses}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-10 bottom-10 flex justify-end gap-3 mt-auto ">
                      <button
                        className="px-2 py-1 w-24 poppins-medium rounded text-themeBlue hover:opacity-80 border-themeBlue border-2"
                        onClick={onClose}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="px-2 py-1  poppins-medium rounded bg-themeBlue hover:opacity-80 text-white"
                        type="button"
                        onClick={handleRevokeSubmit}
                      >
                        Revoke Course
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentCourseDetails;
