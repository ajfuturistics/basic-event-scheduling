import moment from "moment";

export const generateWeekArray = (weekShift: number) => {
  const weekArray = [];
  const currentDate = moment().startOf("week").add(weekShift, "weeks");

  for (let i = 0; i < 7; i++) {
    const day = currentDate.clone().add(i, "days");
    const dayDetails = {
      dayName: day.format("ddd"),
      date: day.format("yyyy-MM-D"),
    };
    weekArray.push(dayDetails);
  }

  return weekArray;
};

export const TimeArrGenerator = () => {
  let hoursArray = [];
  for (var hour = 0; hour < 24; hour++) {
    // var hourString = hour < 10 ? "0" + hour : hour.toString();

    hoursArray.push(hour);
  }

  return hoursArray;
};
