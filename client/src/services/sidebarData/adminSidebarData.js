import { AiFillHome } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";

export const adminSidebarData = [
  {
    title: "Home",
    icon: <AiFillHome className="w-5 h-5 " />,
    link: "/admin/:id",
  },
  {
    title: "Students",
    icon: <PiStudentFill className="w-5 h-5 " />,
    link: "/admin/:id/students",
  },
  {
    title: "Faculties",
    icon: <FaChalkboardTeacher className="w-5 h-5 " />,
    link: "/admin/:id/faculties",
  },

  {
    title: "Add Student",
    icon: <IoPersonAddSharp className="w-5 h-5 " />,
    link: "/admin/:id/add-student",
  },
  {
    title: "Add Faculty",
    icon: <IoIosPersonAdd className="w-5 h-5 " />,
    link: "/admin/:id/add-faculty",
  },
];
