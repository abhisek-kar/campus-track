import { AiFillHome } from "react-icons/ai";
import { BsCardChecklist } from "react-icons/bs";
import { PiChalkboardTeacherFill } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";
import { MdAssignmentTurnedIn, MdSchedule } from "react-icons/md";

export const studentSidebarData = [
  {
    title: "Home",
    icon: <AiFillHome className="w-5 h-5 " />,
    link: "/student",
  },
  {
    title: "Attendance",
    icon: <BsCardChecklist className="w-5 h-5 " />,
    link: "/student/attendance",
  },
  {
    title: "Assignments",
    icon: <MdAssignmentTurnedIn className="w-5 h-5 " />,
    link: "/student/assignments",
  },
  // {
  //   title: "Time Table",
  //   icon: <MdSchedule className="w-5 h-5 " />,
  //   link: "/student/time-table",
  // },

  // {
  //   title: "Performance",
  //   icon: <GiProgression className="w-5 h-5 " />,
  //   link: "/student/performance",
  // },
  // {
  //   title: "Schedule",
  //   icon: <MdSchedule className="w-5 h-5 " />,
  //   link: "/student/schedule",
  // },
];
