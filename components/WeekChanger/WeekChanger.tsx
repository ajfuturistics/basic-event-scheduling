"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";

const WeekChanger = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentWeek = Number(searchParams.get("week")) || 0;

  const handlePrev = () => {
    router.push(`${pathname}?week=${currentWeek - 1}`);
  };
  const handleNext = () => {
    router.push(`${pathname}?week=${currentWeek + 1}`);
  };
  return (
    <div className=" w-full flex justify-end gap-2 mb-2">
      <BsArrowLeftSquareFill
        size={40}
        className="cursor-pointer"
        onClick={handlePrev}
      />{" "}
      <BsArrowRightSquareFill
        size={40}
        className="cursor-pointer"
        onClick={handleNext}
      />
    </div>
  );
};

export default WeekChanger;
