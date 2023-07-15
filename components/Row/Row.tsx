import React from "react";
import Column from "../Column/Column";

interface Props {
  data: WeekDays[];
  time: number;
}
const Row = ({ data, time }: Props) => {
  return (
    <tr className="relative">
      {data.map((d, idx) => (
        <Column key={idx} data={d} index={idx} time={time} />
      ))}
    </tr>
  );
};

export default Row;
