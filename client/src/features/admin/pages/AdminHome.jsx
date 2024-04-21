import React, { useEffect, useState } from "react";
import AdminDashBoard from "../../../components/dashboard/AdminDashBoard";
import Chart from "./../../../components/Chart";
import API from "../../../services/API";

const AdminHome = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalFaculties, setTotalFaculties] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/faculty");
        setTotalFaculties(data?.faculty?.length);
        console.log(data);
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
        const { data } = await API.get("/student");
        setTotalStudents(data?.students?.length);
        console.log(data);
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
        setTotalCourses(data?.courses?.length);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  return (
    <AdminDashBoard>
      {/* boxes */}

      <div className="flex gap-2 w-full mt-20 justify-evenly">
        <Box boxName={"Total Students"} boxCount={totalStudents} />
        <Box boxName={"Total Faculties"} boxCount={totalFaculties} />
        <Box boxName={"Total Courses"} boxCount={totalCourses} />
      </div>
      {/* <div className="mt-5 w-full ml-auto">
        <Chart
          label1={"1st yr"}
          label2={"2nd yr"}
          label3={"3rd yr"}
          label4={"4th yr"}
          data1={[80, 85, 90, 88, 82, 75, 78, 85, 90, 92, 88, 85]}
          data2={[75, 80, 85, 88, 92, 90, 85, 80, 78, 82, 85, 88]}
          data3={[85, 88, 92, 90, 85, 80, 78, 82, 85, 88, 90, 92]}
          data4={[90, 92, 85, 80, 75, 78, 82, 85, 88, 90, 85, 88]}
          content={"Attendance Trend (in %age)"}
          labels={[
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ]}
        />
      </div> */}
    </AdminDashBoard>
  );
};

export default AdminHome;

function Box({ boxName, boxCount }) {
  return (
    <div className="bg-themeBlue flex flex-col items-center justify-center w-[25%] h-36 rounded  text-white  hover:scale-105 transition-all ">
      <span className="font-mono tracking-wide font-semibold text-xl">
        {boxName}
      </span>
      <span className="font-mono tracking-wide text-lg">{boxCount}</span>
    </div>
  );
}
