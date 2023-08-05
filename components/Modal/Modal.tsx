"use client";

import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { FormEvent, useRef, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { TimeArrGenerator } from "@/utils/generatorFunctions";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: WeekDays;
  time: number;
  todaySchedule?: Schedule | undefined;
}

const ModalComponent = ({
  openModal,
  setOpenModal,
  data,
  time,
  todaySchedule,
}: Props) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState({
    dayName: todaySchedule?.from.dayName || data.dayName,
    date: todaySchedule?.from.date || data.date,
    time: todaySchedule?.from.time || time,
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = moment(e.target.value).format("yyyy-MM-D");

    setDate({
      ...date,
      dayName: moment(e.target.value).format("ddd"),
      date: dateStr,
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current) {
      return;
    }

    if (titleRef.current.value.trim() === "") {
      alert("Title is required");
      return;
    }

    if (
      !moment(`${date.date} ${date.time}`, "yyyy-MM-D H").isSameOrAfter(
        Date.now(),
        "hour"
      )
    ) {
      alert("Date/Time is in past");
      return;
    }

    const schedule: Schedule = {
      title: titleRef.current.value,
      from: date,
      to: {
        ...date,
        time: date.time + 1,
      },
    };

    if (todaySchedule) {
      fetch(`/api/schedule?id=${todaySchedule._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(schedule),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.message) {
            alert(data.message || "Something went wrong");
          }
          setOpenModal(false);
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetch(`/api/schedule`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(schedule),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.message) {
            alert(data.message || "Something went wrong");
          }
          setOpenModal(false);
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    }
  };

  const handleDelete = () => {
    if (todaySchedule) {
      fetch(`/api/schedule?id=${todaySchedule._id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.message) {
            alert(data.message || "Something went wrong");
          }
          setOpenModal(false);
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {todaySchedule ? "Update" : "Create"} Schedule
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Schedule Title" />
            </div>
            <TextInput
              id="title"
              placeholder="Product Discussion"
              ref={titleRef}
              defaultValue={todaySchedule?.title || ""}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="date" value="Schedule Date" />
            </div>
            <TextInput
              id="date"
              type="date"
              value={moment(date.date).format("yyyy-MM-DD")}
              onChange={handleDateChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="time" value="Schedule Time" />
            </div>
            <Select
              id="time"
              value={date.time}
              onChange={(e) => {
                setDate({
                  ...date,
                  time: Number(e.target.value),
                });
              }}
              required
            >
              {TimeArrGenerator().map((time) => (
                <option key={time} value={time}>
                  {moment(time, "H").format("hh A")}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="time"
                value="Schedule End Time (Auto Generated)"
              />
            </div>
            <Select id="time" value={date.time + 1} disabled required>
              {TimeArrGenerator().map((time) => (
                <option key={time} value={time}>
                  {moment(time, "H").format("hh A")}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" onClick={handleSubmit}>
          {todaySchedule ? "Update" : "Create"}
        </Button>
        {todaySchedule && (
          <Button type="button" color="failure" onClick={handleDelete}>
            Delete
          </Button>
        )}
        <Button
          type="button"
          color="purple"
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
