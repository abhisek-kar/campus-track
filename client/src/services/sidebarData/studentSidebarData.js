import { AiFillHome } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";
import { MdSchedule } from "react-icons/md";

export const studentSidebarrData = [
  {
    title: "Home",
    icon: <AiFillHome className="w-5 h-5 " />,
    link: "/student",
  },
  {
    title: "Academy",
    icon: <PiChalkboardTeacherFill className="w-5 h-5 " />,
    link: "/student/academy",
  },
  {
    title: "Attendance",
    icon: <BsCardChecklist className="w-5 h-5 " />,
    link: "/student/attendance",
  },
  {
    title: "Performance",
    icon: <GiProgression className="w-5 h-5 " />,
    link: "/student/performance",
  },
  {
    title: "Schedule",
    icon: <MdSchedule className="w-5 h-5 " />,
    link: "/student/schedule",
  },
];
