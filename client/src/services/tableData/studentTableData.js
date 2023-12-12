export const studentTableheading = [
  "Serial",
  "Regd. No.",
  "Name",
  "Eamil",
  "Mobile No.",
  "Year",
  "Semester",
  "Attendance",
];
export const dummyStudents = Array.from({ length: 45 }, (_, index) => ({
  id: index + 1,
  regNo: `20011040${index + 1}`,
  name: `Student ${index + 1}`,
  email: `student${index + 1}@example.com`,
  mobileNo: `123456789${index + 1}`,
  year: "4th",
  semester: "7th",
  address: "75%",
}));
