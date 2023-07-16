import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const ScheduleArr: Schedule[] = [];

export async function GET(request: Request) {
  return NextResponse.json(
    {
      schedules: ScheduleArr,
    },
    { status: 200 }
  );
}
export async function POST(request: NextRequest) {
  const { title, from, to } = await request.json();

  const schedule = { id: uuidv4(), title, from, to };

  ScheduleArr.push(schedule);

  return NextResponse.json(
    {
      schedules: ScheduleArr,
    },
    { status: 200 }
  );
}
export async function PUT(request: NextRequest) {
  const scheduleId = request.nextUrl.searchParams.get("id") || "0";

  if (!scheduleId) {
    return NextResponse.json(
      {
        message: "Schedule Id not found",
      },
      { status: 400 }
    );
  }

  const scheduleIndex = ScheduleArr.findIndex((sch) => sch.id === scheduleId);

  if (scheduleIndex === -1) {
    return NextResponse.json(
      {
        message: "user not found",
      },
      { status: 404 }
    );
  }

  const { title, from, to } = await request.json();

  ScheduleArr[scheduleIndex].title = title;
  ScheduleArr[scheduleIndex].from = from;
  ScheduleArr[scheduleIndex].to = to;

  return NextResponse.json(
    {
      schedules: ScheduleArr,
    },
    { status: 200 }
  );
}
export async function DELETE(request: NextRequest) {
  const scheduleId = request.nextUrl.searchParams.get("id") || "0";

  if (!scheduleId) {
    return NextResponse.json(
      {
        message: "Schedule Id not found",
      },
      { status: 400 }
    );
  }

  const scheduleIndex = ScheduleArr.findIndex((sch) => sch.id === scheduleId);

  if (scheduleIndex === -1) {
    return NextResponse.json(
      {
        message: "user not found",
      },
      { status: 404 }
    );
  }
  ScheduleArr.splice(scheduleIndex, 1);

  return NextResponse.json(
    {
      schedules: ScheduleArr,
    },
    { status: 200 }
  );
}
