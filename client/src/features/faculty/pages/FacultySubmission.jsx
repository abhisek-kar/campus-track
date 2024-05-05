import React, { useEffect, useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Dropdown from "react-dropdown";
import Table from "./../../../components/Table";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";
import toast from "react-hot-toast";
import API from "../../../services/API";
import Loader from "../../../components/Loader";
import { useSelector } from "react-redux";
import { formatDate } from "../../../services/util";

const FacultySubmission = () => {
  const { user } = useSelector((state) => state?.auth);
  const [submissionDetails, setSubmissionDetails] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const [viewTable, setViewTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showingSubmissionFor, setShowingSubmissionFor] = useState("");
  const [assignmentDetails, setAssignmentDetails] = useState([]);
  const [listOfAssignmentsAvailable, setListOfAssignmentsAvailable] = useState(
    []
  );
  const [id, setId] = useState("");

  const handleGetSubmissionDetails = async () => {
    if (!selectedAssignment) {
      return toast.error("please select any of assignments");
    }
    setLoading(true);
    try {
      const { data } = await API.get(
        "/assignment/get-submission-details/" + selectedAssignment
      );
      console.log(data);
      setSubmissionDetails(data?.submissions);
      toast.success("submission details fetched successfully");
      console.log("MMMMMMMMMMMMM", data);
      setSelectedAssignment("");
      setViewTable(true);
    } catch (error) {
      console.log(error);
      setViewTable(false);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(
          "/assignment/faculty-assignments/" + user?._id
        );
        console.log("xxxxxxxxxxxxxxxxx", data);
        setListOfAssignmentsAvailable(data?.assignments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  const submissionTableHeadData = [
    {
      accessorKey: "serial",
      header: "Serial",
      size: 50,
    },
    {
      accessorKey: "regdNo",
      header: "Regd. No.",
      size: 150,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 200,
    },
    {
      accessorKey: "submissionDate",
      header: "Submission Date",
      size: 200,
    },
    {
      accessorKey: "document",
      header: "Document",
      size: 100,
    },
  ];
  const submissionTableData = submissionDetails?.map((item, idx) => {
    return {
      serial: idx + 1,
      regdNo: item?.student?.regdNo,
      name: item?.student?.name,
      submissionDate: formatDate(item?.submittedOn),
      document: <View item={item} />,
    };
  });
  return (
    <FacultyDashBoard>
      {loading && <Loader />}
      {/* dropdown */}
      <div className="flex items-center justify-between mt-5 mb-10">
        <select
          value={selectedAssignment}
          onChange={(e) => setSelectedAssignment(e.target.value)}
          className="p-2 poppins-bold-italic border-2 outline-none border-none  rounded"
        >
          <option value="" className="poppins-medium">
            Select an Assignment
          </option>
          {listOfAssignmentsAvailable?.map((assignment, idx) => {
            return (
              <option
                key={idx}
                value={assignment?._id}
                className="poppins-medium"
              >
                {assignment?.department?.code} {"->"} {assignment?.semester}{" "}
                {" sem ->"} {assignment?.course?.name}
                {"->"} {formatDate(assignment?.createdOn)}
              </option>
            );
          })}
        </select>

        <button
          onClick={handleGetSubmissionDetails}
          className="ml-auto scale-110 px-2 py-1 poppins-medium text-white bg-themeBlue rounded hover:opacity-90"
        >
          Get Submission Details
        </button>
      </div>
      {/*  */}
      <div className="poppins-medium text-gray-800 text-xl">
        Assignment Details
      </div>
      <div className="poppins-regular text-gray-600 text-sm">
        {assignmentDetails?.length} students submitted
      </div>{" "}
      {/* submission table */}
      <Table
        tableData={submissionTableData}
        tableHeadData={submissionTableHeadData}
      />
    </FacultyDashBoard>
  );
};

export default FacultySubmission;

function View({ item }) {
  const [fileData, setFileData] = useState(null);

  const openFileInNewTab = async () => {
    try {
      const { data } = await API.get(
        "assignment/get-submission-doc/" +
          item?.assignmentId +
          "/" +
          item?.student?._id,
        {
          responseType: "blob", // Ensure response type is set to blob for file data
        }
      );
      if (data) {
        const blob = new Blob([data], { type: "application/pdf" }); // Use the data from the API response
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error fetching file data:", error);
    }
  };

  return (
    <div
      onClick={() => {
        openFileInNewTab();
        console.log(item);
      }}
      className="flex  items-center gap-[2x] text-themeBlue poppins-medium underline cursor-pointer font-semibold"
    >
      <HiOutlineDocumentArrowDown /> View
    </div>
  );
}
