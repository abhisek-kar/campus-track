export const facultyTableheading = [
  "Serial",
  "Name",
  "Eamil",
  "Mobile No.",
  "Course",
  "Address",
];
export const dummyFaculty = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  name: `Faculty ${index + 1}`,
  email: `faculty${index + 1}@mail.com`,
  mobileNo: `123456789${index + 1}`,
  course: `course${index + 1}`,
  address: `Address ${index + 1}`,
}));
