import React, { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

const AdminCourseDetails = ({ onClose }) => {
  const assignedCourseDetails = [
    {
      courseId: "1",
      semester: "4th",
      subject: "Computer Network",
    },
    {
      courseId: "2",
      semester: "6th",
      subject: "Automata Theory",
    },
    {
      courseId: "3",

      semester: "8th",
      subject: "Cloud Computing",
    },
  ];
  const [selectedAssignedCourse, setSelectedAssignedCourse] = useState(null);
  const actionOptions = [
    ["assign-course", "Assign New Course"],
    ["revoke-course", "Revoke Existing Course"],
  ];
  const facultyNameOptions = [
    "Faculty Name 1",
    "Faculty Name 2",
    "Faculty Name 3",
    "Faculty Name 4",
    "Faculty Name 5",
  ];
  const courseOptions = [
    "Course Name 1",
    "Course Name 2",
    "Course Name 3",
    "Course Name 4",
    "Course Name 5",
  ];

  const validationSchema = Yup.object().shape({
    action: Yup.string(),
    faculty: Yup.string().required("Faculty Name required"),
    course: Yup.string(),
  });
  const formik = useFormik({
    initialValues: {
      action: actionOptions[0][0],
      faculty: "",
      course: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
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
          {/* heading */}

          <div className=" poppins-extrabold mb-8 text-xl text-gray-700">
            Faculty Course Details
          </div>

          {/* body */}
          <div className="mb-6 ">
            <form onSubmit={formik.handleSubmit}>
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
                        checked={formik.values.action === value}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-4"
                      />
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="my-5">
                {formik.values.action === actionOptions[0][0] && (
                  <div>
                    <div className="flex items-center gap-3 mb-6 justify-between">
                      <label className="poppins-medium text-lg  tracking-wide">
                        Choose Course
                      </label>
                      <div>
                        <select
                          name="course"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.course}
                          className="border-[3px] border-themeBlue mt-1 p-2 rounded-md w-96 tracking-wide poppins-medium text-gray-600 focus:outline-none bg-white"
                        >
                          <option value="">select course</option>
                          {courseOptions.map((course) => (
                            <option key={course} value={course}>
                              {course}
                            </option>
                          ))}
                        </select>
                        {formik.touched.course && formik.errors.course && (
                          <div className="absolute mb-1 text-red-500 poppins-medium text-sm">
                            {formik.errors.course}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex justify-end gap-3 mt-10 ">
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
                )}
                {formik.values.action === actionOptions[1][0] && (
                  <div className="">
                    <div className="my-6 ">
                      {assignedCourseDetails?.map((item, idx) => (
                        <div
                          key={idx}
                          className={`cursor-pointer flex justify-center gap-2 mb-2 border-2 border-gray-400 text-gray-800 p-2 rounded ${
                            item.courseId === selectedAssignedCourse
                              ? "bg-slate-300 text-themeBlue"
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedAssignedCourse(item.courseId)
                          }
                        >
                          <span className="poppins-medium">
                            {item.semester} Semester --------{">"}
                          </span>
                          <span className="poppins-medium-italic">
                            {item.subject}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex justify-end ">
                      <button
                        disabled={!selectedAssignedCourse}
                        className={` px-2 py-1 ml-auto poppins-medium rounded bg-themeBlue  text-white ${
                          selectedAssignedCourse ? "" : "opacity-50"
                        }`}
                        type="submit"
                      >
                        Revoke Selected Course
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
