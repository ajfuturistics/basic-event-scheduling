import Row from "@/components/Row/Row";
import WeekBar from "@/components/WeekBar/WeekBar";
import { TimeArrGenerator } from "@/utils/generatorFunctions";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";

const WEEKDAYS = [
  { day: "Sun", date: "09" },
  { day: "Mon", date: "10" },
  { day: "Tue", date: "11" },
  { day: "Wed", date: "12" },
  { day: "Thu", date: "13" },
  { day: "Fri", date: "14" },
  { day: "Sat", date: "15" },
];

async function GetCurrentWeek(week: string) {
  const data = await fetch(`${process.env.BASE_URL}/api/week?week=${week}`, {
    cache: "no-store",
  });

  if (!data.ok) {
    throw new Error("Failed to get week data");
  }

  return data.json();
}

interface PageProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function Home({ searchParams }: PageProps) {
  const data: { week: WeekDays[] } = await GetCurrentWeek(
    searchParams?.week || "0"
  );
  const hoursInDay = TimeArrGenerator();
  console.log(data);

  return (
    <main className="w-full max-w-[50rem]">
      <h1 className="text-center my-2">Current Week</h1>

      <div className=" w-full flex justify-end gap-2 mb-2">
        <BsArrowLeftSquareFill size={40} className="cursor-pointer" />{" "}
        <BsArrowRightSquareFill size={40} className="cursor-pointer" />
      </div>
      <table className="w-full relative">
        <WeekBar week={data.week} />
        <tbody>
          {hoursInDay.map((time) => (
            <Row key={time} data={data.week} time={time} />
          ))}
        </tbody>
      </table>
    </main>
  );
}
