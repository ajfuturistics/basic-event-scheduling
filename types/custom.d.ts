interface WeekDays {
  dayName: string;
  date: number;
  month: number;
  year: number;
}

interface ScheduleDateTime {
  dayName: string;
  year: number;
  month: number;
  date: number;
  time: number;
}
interface Schedule {
  id?: string;
  title: string;
  from: ScheduleDateTime;
  to: ScheduleDateTime;
}
