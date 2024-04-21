export function formatDate(dateString) {
  const dateObj = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  // Extract day without leading zero
  const day = dateObj.getDate();
  const dayStr = day > 9 ? `${day}th` : `${day}th`.replace("0", "");

  // Replace day in the formatted date
  const formattedDateWithDay = formattedDate.replace(
    /\d+(st|nd|rd|th)/,
    dayStr
  );

  return formattedDateWithDay;
}
