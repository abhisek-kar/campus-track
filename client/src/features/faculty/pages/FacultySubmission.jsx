import React, { useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Dropdown from "react-dropdown";

const FacultySubmission = () => {
  const [assignment, setAssignment] = useState("");
  const options = ["1st yr", "2nd yr", "3rd yr", "4th yr"];

  return (
    <FacultyDashBoard>
      {/* dropdown */}
      <div className="flex gap-5">
        <Dropdown
          options={options}
          onChange={(e) => setAssignment(e.value)}
          value={assignment}
          placeholder="Select Assignment "
          className="w-72 rounded "
        />

        <button className="ml-auto px-2 py-1 poppins-medium text-white bg-themeBlue rounded hover:opacity-90">
          Get Submission Details
        </button>
      </div>
    </FacultyDashBoard>
  );
};

export default FacultySubmission;
