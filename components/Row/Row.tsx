import React from "react";
import Column from "../Column/Column";

interface Props {
  data: WeekDays[];
  time: number;
  schedules?: Schedule[];
}
const Row = ({ data, time, schedules }: Props) => {
  return (
    <tr className="relative">
      {data.map((d, idx) => (
        <Column
          key={idx}
          data={d}
          index={idx}
          time={time}
          schedules={schedules}
        />
      ))}
    </tr>
  );
};

export default Row;
