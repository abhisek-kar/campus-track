import React, { useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import API from "../../../services/API";
import Dropdown from "react-dropdown";
import toast, { Toaster } from "react-hot-toast";

const AdminCourseDetails = ({ onClose }) => {
  const { user } = useSelector((state) => state?.auth);
  const { currentFaculty } = useSelector((state) => state?.admin);
  const semOptions = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const [listOfAssigendCourse, setListOfAssigendCourse] = useState([]);
  const [listOfAvailableCourse, setListOfAvailableCourse] = useState([]);
  const [selectedAssignCourse, setSelectedAssignCourse] = useState("");
  const [selectedRevokeCourse, setSelectedRevokeCourse] = useState("");
  const [semester, setSemester] = useState("");
  // const assignedCourseDetails = [
  //   {
  //     courseId: "1",
  //     semester: "4th",
  //     subject: "Computer Network",
  //   },
  //   {
  //     courseId: "2",
  //     semester: "6th",
  //     subject: "Automata Theory",
  //   },
  //   {
  //     courseId: "3",

  //     semester: "8th",
  //     subject: "Cloud Computing",
  //   },
  // ];
  const actionOptions = [
    ["assigned-courses", "Assigned Courses"],
    ["assign-course", "Assign New Course"],
    ["revoke-course", "Revoke Existing Course"],
  ];
  const [action, setAction] = useState(actionOptions[0][0]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(currentFaculty);
        const userData = {
          facultyId: currentFaculty?._id,
          departmentId: user?.department?._id,
        };
        const { data } = await API.post("/faculty/dept-courses", userData);
        console.log();
        setListOfAssigendCourse(data?.faculty?.courses?.slice(1));
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
        const { data } = await API.get("/course");
        setListOfAvailableCourse(data?.courses);
        console.log(data?.courses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!semester) {
      return toast.error("please select  semester");
    }
    if (!selectedAssignCourse) {
      return toast.error("please select a course");
    }

    const courseData = {
      facultyId: currentFaculty?._id,
      courseId: selectedAssignCourse,
      departmentId: user?.department?._id,
      semester,
    };

    try {
      const { data } = await API.patch("/faculty/add-course", courseData);
      console.log(data);
      setSelectedAssignCourse("");
      setSemester("");
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };
  const handleRevokeSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedRevokeCourse) {
      return toast.error("please select a course");
    }

    const courseData = {
      facultyId: currentFaculty?._id,
      courseId: selectedRevokeCourse,
      departmentId: user?.department?._id,
    };
    console.log(courseData);
    try {
      const { data } = await API.patch("/faculty/delete-course", courseData);
      console.log(data);
      setSelectedRevokeCourse("");
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
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
          <Toaster />
          {/* heading */}

          <div className="mb-10">
            <span className=" poppins-bold-italic mb-8 text-xl text-gray-700">
              {currentFaculty?.name}
            </span>
            <span className=" ml-2 poppins-bold-italic mb-8 text-xl text-gray-600">
              Course Details
            </span>
          </div>

          {/* body */}
          <div className="mb-6 ">
            <form onSubmit={() => {}}>
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
                      className="px-2 rounded py-1 bg-themeBlue w-full mx-5 my-1 grid  poppins-medium text-white  "
                      style={{ gridTemplateColumns: "1fr 1fr 2fr 3fr" }}
                    >
                      <span>Serial No.</span>
                      <span>Semster</span>
                      <span className="">Course ID</span>
                      <span className="">Course Name</span>
                    </div>

                    {listOfAssigendCourse?.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className="px-2 rounded py-1 bg-themeBlue bg-opacity-95 w-full mx-5 my-1 grid items-center poppins-medium text-white  "
                          style={{ gridTemplateColumns: "1fr 1fr 2fr 3fr" }}
                        >
                          <span>{idx + 1}</span>
                          <span>{item?.semester}</span>
                          <span className="">{item?.course?.code}</span>
                          <span className="">{item?.course?.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {action === actionOptions[1][0] && (
                  <div>
                    <div className="">
                      <label className="poppins-medium text-lg mb-2 tracking-wide">
                        Choose Course
                      </label>
                      <div>
                        <select
                          // id="courseSelect"
                          value={semester}
                          onChange={
                            (e) => setSemester(e.target.value)
                            // console.log(e.target.value)
                          }
                          className="w-full p-2 poppins-bold-italic border-2 border-gray-600 mt-3 rounded"
                        >
                          <option value="" className="poppins-medium">
                            Select a Semester
                          </option>
                          {semOptions?.map((sem) => (
                            <option
                              key={sem}
                              value={sem}
                              className="poppins-medium"
                            >
                              {sem}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <select
                          id="courseSelect"
                          value={selectedAssignCourse}
                          onChange={
                            (e) => setSelectedAssignCourse(e.target.value)
                            // console.log(e.target.value)
                          }
                          className="w-full p-2 poppins-bold-italic border-2 border-gray-600 mt-3 rounded"
                        >
                          <option value="" className="poppins-medium">
                            Select a course
                          </option>
                          {listOfAvailableCourse
                            ?.filter(
                              (course) =>
                                !listOfAssigendCourse.find(
                                  (assignedCourse) =>
                                    assignedCourse._id === course._id
                                )
                            )
                            .map((course) => (
                              <option
                                key={course._id}
                                value={course._id}
                                className="poppins-medium"
                              >
                                {course?.name}
                              </option>
                            ))}
                        </select>
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
                        onClick={handleAssignSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
                {action === actionOptions[2][0] && (
                  <div className="">
                    <div className="">
                      <label className="poppins-medium text-lg mb-2 tracking-wide">
                        Assigned Courses
                      </label>
                      <div>
                        <select
                          id="courseSelect"
                          value={selectedRevokeCourse}
                          onChange={(e) =>
                            setSelectedRevokeCourse(e.target.value)
                          }
                          className="w-full p-2 poppins-bold-italic border-2 border-gray-600 mt-3 rounded"
                        >
                          <option value="" className="poppins-medium">
                            Select a course
                          </option>
                          {listOfAssigendCourse?.map((course) => (
                            <option
                              key={course._id}
                              value={course._id}
                              className="poppins-medium"
                            >
                              {course?.course?.name || "Course Name"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="absolute right-10 bottom-10 flex  gap-3  ">
                      <button
                        className="px-2 py-1 w-24 poppins-medium rounded text-themeBlue hover:opacity-80 border-themeBlue border-2"
                        onClick={onClose}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        className="px-2 py-1  poppins-medium rounded bg-themeBlue hover:opacity-80 text-white"
                        onClick={handleRevokeSubmit}
                      >
                        Revoke Course
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourseDetails;
