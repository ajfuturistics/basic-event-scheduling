"use client";
import React from "react";
import moment from "moment";
import { Tooltip } from "flowbite-react";

interface Props {
  data: WeekDays;
  index: number;
  time: number;
}
const Column = ({ index, data, time }: Props) => {
  return (
    <td
      onClick={() => {
        if (
          moment([data.year, data.month, data.date, time]).isSameOrAfter(
            Date.now(),
            "hour"
          )
        ) {
          console.log({
            index,
            schedule: {
              from: new Date(data.year, data.month, data.date, time),
              to: new Date(data.year, data.month, data.date, time + 1),
            },
          });
        } else {
          console.log("Date/Time is in past");
        }
      }}
      className="h-14 border-[1px] border-gray-300 p-2 relative"
    >
      {index === 0 && (
        <span className="absolute bg-gray-100 text-sm p-1 -top-2 -left-20">
          {moment([data.year, data.month, data.date, time]).format("hh:mm A")}
        </span>
      )}

      {/* <Tooltip
        content={`Meet Scheduled from ${moment([
          data.year,
          data.month,
          data.date,
          time,
        ]).format("h:mm a")} to ${moment([
          data.year,
          data.month,
          data.date,
          time + 1,
        ]).format("h:mm a")}`}
        placement="left"
      >
        <div className="absolute w-20 h-6 bg-blue-300 rounded-sm top-2 right-2 cursor-pointer"></div>
      </Tooltip> */}
    </td>
  );
};

export default Column;
