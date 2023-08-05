import { Schema, model, models } from "mongoose";

const ScheduleSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
  },
  from: {
    dayName: { type: String, required: [true, "Date is required!"] },
    date: { type: String, required: [true, "Date is required!"] },
    time: { type: Number, required: [true, "Date is required!"] },
  },
  to: {
    dayName: { type: String, required: [true, "Date is required!"] },
    date: { type: String, required: [true, "Date is required!"] },
    time: { type: Number, required: [true, "Date is required!"] },
  },
});

const Schedule = models.Schedule || model("Schedule", ScheduleSchema);

export default Schedule;
