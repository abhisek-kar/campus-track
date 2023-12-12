import React, { useState } from "react";
import Table from "../../components/tables/Table";
import {
  studentTableheading,
  dummyStudents,
} from "../../services/tableData/studentTableData";
import { GoArrowDown } from "react-icons/go";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import AllTableDataModal from "../../components/modals/AllTableDataModal";
import { IoFilter } from "react-icons/io5";

const AdminStudents = () => {
  const [filterOption, setFilterOption] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [pageNo, setPageNo] = useState(1);
  // const [filterCriteria, setFilterCriteria] = useState("");
  const [showAllStudentsModal, setShowStudentsModal] = useState(false);

  const filters = ["Year", "Semester", "Attendance", "Registration Number"];
  const filterData = {
    Year: ["1st", "2nd", "3rd", "4th"],
    Semester: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
    Attendance: [">= 75%", "< 75%"],
  };

  const handleSearch = async () => {};
  return (
    <div className="w-full px-2">
      {/* filter options*/}
      <div className=" flex gap-2 items-center">
        <div className="text-lg font-semibold font-mono">
          <IoFilter />
        </div>
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="w-[20%] font-semibold  text-gray-600 tracking-wide font-mono  outline-none  border-themeBlue border-2 rounded-md  p-1"
        >
          <option value="">select</option>
          {filters &&
            filters.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
        </select>
        {/* filter criteria */}
        {filterOption ? (
          filterOption === "Registration Number" ? (
            <input
              placeholder="e.g 2001104065"
              type="number"
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className="w-[20%] font-semibold text-gray-600 tracking-wide font-mono outline-none border-themeBlue border-2 rounded-md py-[1px] pl-2"
            />
          ) : (
            <select
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className="w-[20%] font-semibold text-gray-600 tracking-wide font-mono outline-none border-themeBlue border-2 rounded-md p-1"
            >
              <option value="">select</option>
              {filterData[filterOption] &&
                filterData[filterOption].map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
            </select>
          )
        ) : (
          <select className="w-[20%] font-semibold text-gray-600 tracking-wide font-mono outline-none border-themeBlue border-2 rounded-md p-1">
            <option value="">select</option>
            <option value="" disabled>
              select a filter option
            </option>
          </select>
        )}
        {/* search Button */}
        <button
          onClick={handleSearch}
          className=" rounded hover:bg-opacity-90 bg-themeBlue py-1 px-2   text-white font-mono font-semibold tracking-wide ml-5"
        >
          Search
        </button>
      </div>
      {/* student data in a table  */}
      <div className=" mt-5">
        <Table
          headingData={studentTableheading}
          rowData={dummyStudents.slice((pageNo - 1) * 10, pageNo * 10)}
        />
      </div>
      {/* show more option */}
      <div
        className="text-themeBlue font-mono font-semibold flex items-center cursor-pointer"
        onClick={() => setShowStudentsModal(true)}
      >
        <span>show more</span>
        <GoArrowDown />
      </div>
      {/* showing students in a scrollable modal on clicking showmore  */}
      {showAllStudentsModal ? (
        <AllTableDataModal
          showModal={showAllStudentsModal}
          onClose={() => setShowStudentsModal(false)}
          headingData={studentTableheading}
          rowData={dummyStudents}
        />
      ) : (
        <></>
      )}
      {/* pagination */}
      <div className="flex justify-end text-themeBlue gap-2">
        <button
          onClick={() => {
            if (pageNo > 1) {
              setPageNo(pageNo - 1);
            }
          }}
          className="border-2 p-1 border-themeBlue rounded hover:bg-themeBlue hover:text-white "
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={() => {
            setPageNo(1);
          }}
          className="border-2 p-1 border-themeBlue rounded hover:bg-themeBlue hover:text-white "
        >
          1
        </button>
        <button
          onClick={() => {
            setPageNo(2);
          }}
          className="border-2 p-1 border-themeBlue rounded hover:bg-themeBlue hover:text-white "
        >
          2
        </button>
        <button
          onClick={() => {
            setPageNo(3);
          }}
          className="border-2 p-1 border-themeBlue rounded hover:bg-themeBlue hover:text-white "
        >
          3
        </button>
        <button
          onClick={() => {
            let totalPages =
              dummyStudents.length % 10 === 0
                ? dummyStudents.length / 10
                : dummyStudents.length / 10 + 1;
            if (pageNo < totalPages - 1) {
              setPageNo(pageNo + 1);
            }
          }}
          className="border-2 p-1 border-themeBlue rounded hover:bg-themeBlue hover:text-white "
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default AdminStudents;
