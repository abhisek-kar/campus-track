import { AiFillHome } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { PiStudentFill } from "react-icons/pi";
import { MdSchedule } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { MdTask } from "react-icons/md";

export const facultySidebarData = [
  {
    title: "Home",
    icon: <AiFillHome className="w-5 h-5 " />,
    link: "/faculty",
  },
  {
    title: "Attendance",
    icon: <BsCardChecklist className="w-5 h-5 " />,
    link: "/faculty/attendance",
  },
  {
    title: "Students",
    icon: <PiStudentFill className="w-5 h-5 " />,
    link: "/faculty/students",
  },
  {
    title: "Assignments",
    icon: <PiExam className="w-5 h-5 " />,
    link: "/faculty/assignments",
  },
  {
    title: "Submissions",
    icon: <MdTask className="w-5 h-5 " />,
    link: "/faculty/submissions",
  },
];
