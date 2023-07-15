import { generateWeekArray } from "@/utils/generatorFunctions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const week = Number(request.nextUrl.searchParams.get("week")) || 0;
  const weekData = generateWeekArray(week);

  return NextResponse.json(
    {
      week: weekData,
    },
    { status: 200 }
  );
}
