import React, { useState } from "react";
import InputBox from "../../components/InputBox";
import Dropdown from "../../components/Dropdown";
import SubmitButton from "../../components/buttons/SubmitButton";

const AdminAddFaculty = () => {
  const [action, setAction] = useState("");
  return (
    <div className="mt-3 px-3 w-full h-full">
      {/* drop down to choose */}

      <Dropdown
        labelName={"Choose What to do?"}
        value={action}
        onChange={(e) => setAction(e.target.value)}
        data={[
          ["add-faculty", "Add New Faculty"],
          ["assign-course", "Assign New Course"],
          ["revoke-course", "Revoke Existing Course"],
        ]}
        width={"w-[20%]"}
      />
      {/* Add New faculty */}
      {action && action === "add-faculty" ? (
        <form>
          <div className="grid grid-cols-2 gap-5">
            <InputBox labelName={"Faculty Name"} />
            <InputBox labelName={"Faculty Email"} type={"email"} />
            <InputBox labelName={"Mobile Number"} type={"number"} />
            <InputBox labelName={"Address"} />
          </div>
          <div className="mt-5 w-full  flex flex-row-reverse">
            <SubmitButton buttonName={" Add Faculty"} />
          </div>
        </form>
      ) : (
        <></>
      )}

      {/* Assign Course to a faculty */}
      {action && action === "assign-course" ? (
        <form action="">
          <div className="grid grid-cols-2 gap-5">
            <Dropdown
              labelName={"Faculty Name"}
              data={[
                ["facultyId", "Faculty 1"],
                ["facultyId", "Faculty 2"],
                ["facultyId", "Faculty 3"],
                ["facultyId", "Faculty 4"],
                ["facultyId", "Faculty 5"],
              ]}
            />
            <Dropdown
              labelName={"Select Course"}
              data={[
                ["courseId", "course 1"],
                ["courseId", "course 2"],
                ["courseId", "course 3"],
                ["courseId", "course 4"],
                ["courseId", "course 5"],
              ]}
            />
          </div>
          <div className="mt-5 w-full  flex flex-row-reverse">
            <SubmitButton buttonName={"Assign Course"} />
          </div>
        </form>
      ) : (
        <></>
      )}
      {/* Revoke Courses from a faculty */}
      {action && action === "revoke-course" ? (
        <form>
          <div className="grid grid-cols-2 gap-5">
            <Dropdown
              labelName={"Faculty Name"}
              data={[
                ["facultyId", "Faculty 1"],
                ["facultyId", "Faculty 2"],
                ["facultyId", "Faculty 3"],
                ["facultyId", "Faculty 4"],
                ["facultyId", "Faculty 5"],
              ]}
            />
            <Dropdown
              labelName={"Select Course"}
              data={[
                ["courseId", "course 1"],
                ["courseId", "course 2"],
                ["courseId", "course 3"],
                ["courseId", "course 4"],
                ["courseId", "course 5"],
              ]}
            />
          </div>
          <div className="mt-5 w-full  flex flex-row-reverse">
            <SubmitButton buttonName={"Revoke Course"} />
          </div>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AdminAddFaculty;
