import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAdmin } from "../../../context/adminContext";
import API from "../../../services/API";
import { FaCloudDownloadAlt } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../Loader";

const AssignmentUploadModal = ({ onClose }) => {
  const { user } = useSelector((state) => state?.auth);
  const { currentAssignment, setCurrentAssignment } = useAdmin();
  const [doc, setDoc] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const response = await API.get(
  //       //   "assignment/get-assignment-doc/" + currentAssignment?._id,
  //       //   {
  //       //     responseType: "blob", // Ensure response type is set to blob for file data
  //       //   }
  //       // );
  //       // console.log(response.data);
  //       // setFileData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching file data:", error);
  //     }
  //   };

  //   fetchData();

  //   return () => {};
  // }, []);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("doc", doc); // Assuming doc is a file object
      formData.append("assignmentId", currentAssignment?._id);
      formData.append("answer", answer);
      formData.append("studentId", user?._id);
      const { data } = await API.patch(
        "/assignment/submit-assignment",
        formData
      );
      onClose();
      toast.success(data?.message);
      setDoc(null);
      setAnswer("");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
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
          {loading && <Loader />}
          <Toaster />
          <div className=" poppins-extrabold mb-8 text-xl text-gray-500">
            Upload Document
          </div>
          <div className="my-5">
            <p className="poppins-medium text-gray-700">Answer</p>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="bg-slate-200 p-2 w-full  poppins-medium-italic border-none outline-none"
              // disabled
            ></textarea>
          </div>

          <div className="flex gap-3 items-center mt-3">
            <label className="poppins-medium block my-2 text-gray-700">
              Attach document
            </label>
            <input
              onChange={(e) => setDoc(e.target.files[0])}
              type="file"
              className="poppins-regular-italic p-2 text-sm text-themeBlue border-none outline-none"
            />
          </div>
          {/* footer */}
          <div className="absolute bottom-5 right-5 flex items-center gap-5">
            <button
              className="px-2 py-1 w-24 poppins-medium rounded border-themeBlue hover:opacity-80 border-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 w-24 poppins-medium rounded bg-themeBlue hover:opacity-80 text-white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentUploadModal;
