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
      result = schedules.find(
        (sch) => sch.from.date === data.date && sch.from.time === time
      );
    }

    return result;
  };

  const todaySchedule = getTodaySchedule();

  return (
    <td className="h-14 border-[1px] border-gray-300">
      {index === 0 && (
        <span className="absolute bg-gray-100 text-sm p-1 -top-2 -left-20">
          {moment(`${data.date} ${time}`, "yyyy-MM-D H").format("hh:mm A")}
        </span>
      )}
      <div
        className="w-full h-full p-2 relative hover:bg-gray-200"
        onClick={() => {
          console.log(`${data.date} ${time}`);

          if (
            moment(`${data.date} ${time}`, "yyyy-MM-D H").isSameOrAfter(
              Date.now(),
              "hour"
            )
          ) {
            setOpenModal(true);
          } else {
            alert("Date/Time is in past");
          }
        }}
      >
        {todaySchedule &&
          moment(
            `${todaySchedule.from.date} ${todaySchedule.from.time}`,
            "yyyy-MM-D H"
          ).isSameOrAfter(Date.now(), "hour") && (
            <Tooltip
              content={`${todaySchedule.title} Meet Scheduled from ${moment(
                `${todaySchedule.from.date} ${todaySchedule.from.time}`,
                "yyyy-MM-D H"
              ).format("h:mm A")} to ${moment(
                `${todaySchedule.to.date} ${todaySchedule.to.time}`,
                "yyyy-MM-D H"
              ).format("h:mm A")}`}
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
        key={
          todaySchedule
            ? `modal-${data.date}-${time}-${todaySchedule?._id}`
            : `modal-${data.date}-${time}`
        }
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
