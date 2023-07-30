import React from "react";

interface Props {
  week: WeekDays[];
}
const WeekBar = ({ week }: Props) => {
  return (
    <thead className="w-full sticky top-0 bg-white z-10">
      <tr className="m-1 w-full">
        {week.map((day) => (
          <th
            key={day.dayName + day.date + day.month + day.year}
            className="border-2 border-gray-700 py-4 bg-slate-200 text-xl font-semibold w-28"
          >
            <p>{day.dayName}</p>
            <p className="text-3xl">{day.date}</p>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default WeekBar;
