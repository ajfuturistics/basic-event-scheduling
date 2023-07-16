"use client";
import React, { useState } from "react";
import moment from "moment";
import { Tooltip } from "flowbite-react";
import ModalComponent from "../Modal/Modal";

interface Props {
  data: WeekDays;
  index: number;
  time: number;
  schedules?: Schedule[];
}
const Column = ({ index, data, time, schedules }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getTodaySchedule = () => {
    let result;
    if (schedules && schedules.length !== 0) {
      result = schedules.find((sch) =>
        moment([data.year, data.month, data.date, time]).isSame([
          sch.from.year,
          sch.from.month,
          sch.from.date,
          sch.from.time,
        ])
      );
    }

    return result;
  };

  const todaySchedule = getTodaySchedule();

  return (
    <td className="h-14 border-[1px] border-gray-300">
      {index === 0 && (
        <span className="absolute bg-gray-100 text-sm p-1 -top-2 -left-20">
          {moment([data.year, data.month, data.date, time]).format("hh:mm A")}
        </span>
      )}
      <div
        className="w-full h-full p-2 relative"
        onClick={() => {
          if (
            moment([data.year, data.month, data.date, time]).isSameOrAfter(
              Date.now(),
              "hour"
            )
          ) {
            console.log("schedules", schedules);

            setOpenModal(true);
          } else {
            alert("Date/Time is in past");
          }
        }}
      >
        {todaySchedule &&
          moment([
            todaySchedule.from.year,
            todaySchedule.from.month,
            todaySchedule.from.date,
            todaySchedule.from.time,
          ]).isSameOrAfter(Date.now(), "hour") && (
            <Tooltip
              content={`${todaySchedule.title} Meet Scheduled from ${moment([
                todaySchedule.from.year,
                todaySchedule.from.month,
                todaySchedule.from.date,
                todaySchedule.from.time,
              ]).format("h:mm a")} to ${moment([
                todaySchedule.to.year,
                todaySchedule.to.month,
                todaySchedule.to.date,
                todaySchedule.to.time,
              ]).format("h:mm a")}`}
              placement="left"
            >
              <div
                onClick={() => setOpenModal(true)}
                className="absolute w-20 h-6 bg-blue-300 rounded-sm top-2 right-2 cursor-pointer"
              ></div>
            </Tooltip>
          )}
      </div>

      <ModalComponent
        key={todaySchedule ? `${todaySchedule?.id}` : `modal-${index}-${time}`}
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={data}
        time={time}
        todaySchedule={todaySchedule}
      />
    </td>
  );
};

export default Column;
