import Row from "@/components/Row/Row";
import WeekBar from "@/components/WeekBar/WeekBar";
import WeekChanger from "@/components/WeekChanger/WeekChanger";
import { TimeArrGenerator } from "@/utils/generatorFunctions";

async function GetCurrentWeek(week: string) {
  const data = await fetch(`${process.env.BASE_URL}/api/week?week=${week}`, {
    cache: "no-store",
  });

  if (!data.ok) {
    throw new Error("Failed to get week data");
  }

  return data.json();
}
async function GetUserSchedules() {
  const data = await fetch(`${process.env.BASE_URL}/api/schedule`, {
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
  const schedulesObj: { schedules: Schedule[] } = await GetUserSchedules();
  const hoursInDay = TimeArrGenerator();
  console.log(schedulesObj);

  return (
    <main className="w-full max-w-[50rem]">
      <h1 className="text-center my-2">Current Week</h1>

      <WeekChanger />

      <table className="w-full relative">
        <WeekBar week={data.week} />
        <tbody>
          {hoursInDay.map((time) => (
            <Row
              key={time}
              data={data.week}
              time={time}
              schedules={schedulesObj?.schedules}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
