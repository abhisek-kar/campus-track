import React from "react";

const Table = ({ headingData, rowData }) => {
  return (
    <table className="w-full  font-mono tracking-wide relative ">
      <thead className="sticky">
        <tr clasNames="bg-gray-200 ">
          {headingData &&
            headingData.map((item) => {
              return (
                <th className=" bg-gray-400 text-left px-1 py-3 ">{item}</th>
              );
            })}
        </tr>
      </thead>
      <tbody>
        {rowData &&
          rowData.map((student) => (
            <tr
              key={student.id}
              className="bg-white text-gray-700 hover:bg-themeBlue hover:text-white border-b-[1px] border-gray-400 font-medium cursor-pointer "
            >
              {/* <td className="px-1 py-2 ">{student.id}</td>
            <td className="px-1 py-2 ">{student.regNo}</td>
            <td className="px-1 py-2 ">{student.name}</td>
            <td className="px-1 py-2 ">{student.email}</td>
            <td className="px-1 py-2 ">{student.mobileNo}</td>
            <td className="px-1 py-2 ">{student.year}</td>
            <td className="px-1 py-2 ">{student.semester}</td> */}
              {Object.values(student).map((value, index) => (
                <td key={index} className="px-1 py-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
