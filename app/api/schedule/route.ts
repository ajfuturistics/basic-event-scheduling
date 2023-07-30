import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Schedule from "@/models/schedule";

export async function GET(request: Request) {
  try {
    await connectToDB();

    const allSchedules = await Schedule.find({});

    return new Response(JSON.stringify(allSchedules), { status: 201 });
  } catch (error) {
    return new Response("Failed to get schedules", { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  const { title, from, to } = await request.json();

  try {
    await connectToDB();

    const checkExisting = await Schedule.find({ from });

    if (!checkExisting) {
      return NextResponse.json(
        {
          message: "Schedule already exists",
        },
        { status: 400 }
      );
    }

    const newSchedule = new Schedule({ title, from, to });
    newSchedule.save();

    return NextResponse.json(
      {
        schedule: newSchedule,
      },
      { status: 201 }
    );
  } catch (error) {
    return new Response("Failed to create a new schedule", { status: 500 });
  }
}
export async function PUT(request: NextRequest) {
  const scheduleId = request.nextUrl.searchParams.get("id") || "0";

  try {
    const schedule = await Schedule.find({ _id: scheduleId });

    if (!schedule) {
      return NextResponse.json(
        {
          message: "Schedule not found",
        },
        { status: 404 }
      );
    }

    const { title, from, to } = await request.json();

    const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, {
      title,
      from,
      to,
    });

    return NextResponse.json(
      {
        schedule: updatedSchedule,
      },
      { status: 200 }
    );
  } catch (error) {
    return new Response("Failed to update schedule", { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  const scheduleId = request.nextUrl.searchParams.get("id") || "0";

  try {
    const schedule = await Schedule.find({ _id: scheduleId });

    if (!schedule) {
      return NextResponse.json(
        {
          message: "Schedule not found",
        },
        { status: 404 }
      );
    }

    await Schedule.findByIdAndRemove(scheduleId);

    return NextResponse.json(
      {
        message: "Schedule Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return new Response("Failed to delete schedule", { status: 500 });
  }
}
