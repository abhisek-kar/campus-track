import { AiFillHome } from "react-icons/ai";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";
import { MdNotificationAdd } from "react-icons/md";

export const adminSidebarData = [
  {
    title: "Home",
    icon: <AiFillHome className="w-5 h-5 " />,
    link: "/admin",
  },
  {
    title: "Students",
    icon: <PiStudentFill className="w-5 h-5 " />,
    link: "/admin/students",
  },
  {
    title: "Faculties",
    icon: <FaChalkboardTeacher className="w-5 h-5 " />,
    link: "/admin/faculties",
  },

  // {
  //   title: "Notification",
  //   icon: <MdNotificationAdd className="w-5 h-5 " />,
  //   link: "/admin/create-notification",
  // },
  // {
  //   title: "Add Faculty",
  //   icon: <IoIosPersonAdd className="w-5 h-5 " />,
  //   link: "/admin/add-faculty",
  // },
];
