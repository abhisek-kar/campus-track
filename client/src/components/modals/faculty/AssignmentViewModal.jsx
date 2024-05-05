import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAdmin } from "../../../context/adminContext";
import API from "../../../services/API";
import { FaCloudDownloadAlt } from "react-icons/fa";

const AssignmentViewModal = ({ onClose }) => {
  const { user } = useSelector((state) => state?.auth);
  const { currentAssignment, setCurrentAssignment } = useAdmin();
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(
          "assignment/get-assignment-doc/" + currentAssignment?._id,
          {
            responseType: "blob", // Ensure response type is set to blob for file data
          }
        );
        console.log(response.data);
        setFileData(response.data);
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  const openFileInNewTab = () => {
    if (fileData) {
      const blob = new Blob([fileData], { type: "application/pdf" }); // Adjust the type based on your file
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    }
  };
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[2147483647]">
      <div
        className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-50 bg-slate-500 flex justify-center items-center overflow-auto"
        onClick={onClose}
      >
        <div
          className="relative p-6 bg-white rounded shadow-md max-w-[90%] max-h-[90%] overflow-auto"
          style={{ width: "60%", height: "60%" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* heading */}

          <div className=" poppins-extrabold mb-8 text-xl text-gray-500">
            Assignment Document
          </div>
          <textarea
            value={currentAssignment?.task}
            className="bg-slate-200 p-2 w-full my-5 poppins-medium-italic"
            disabled
          ></textarea>

          <div className="flex items-center gap-5">
            <div className="poppins-medium text-lg">view document</div>

            <FaCloudDownloadAlt
              className="w-8 h-8 cursor-pointer"
              onClick={openFileInNewTab}
            />
          </div>
          {/* footer */}
          <div className="absolute bottom-5 right-5">
            <button
              className="px-2 py-1 w-24 poppins-medium rounded bg-themeBlue hover:opacity-80 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentViewModal;
