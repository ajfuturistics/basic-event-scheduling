interface WeekDays {
  dayName: string;
  date: string;
}

interface ScheduleDateTime {
  dayName: string;
  date: string;
  time: number;
}
interface Schedule {
  _id?: string;
  title: string;
  from: ScheduleDateTime;
  to: ScheduleDateTime;
}
