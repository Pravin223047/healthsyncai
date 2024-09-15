"use client";

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import "react-calendar/dist/Calendar.css";
import "./react-calendar/dist/Calendar.css";
import clsx from "clsx";
import HeartRateCard from "../HealthSteps/HeartRate/HeartRate";
import { Skeleton } from "@/components/ui/skeleton";

// Define the Value type manually
type CalendarValue = Date | Date[] | null;

const RightSideBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [value, setValue] = useState<CalendarValue>(new Date());

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return (
      <div className="p-4 2xl:mt-20 bg-gray-900 text-white min-h-screen w-full">
        <h1 className="text-lg flex gap-2 font-bold mb-6">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-48" />
        </h1>
        <Skeleton className="w-full h-80 rounded-lg shadow-lg" />
        <Skeleton className="mt-6 h-40 w-full rounded-lg shadow-md" />
        <div className="mt-6 w-full">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    );
  }

  const handleDateChange = (
    newValue: CalendarValue,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setValue(newValue);
  };

  return (
    <div className="p-4 2xl:mt-20 bg-gray-900 text-white min-h-screen w-full">
      <h1 className="text-lg flex gap-2 font-bold mb-6">
        <CalendarIcon /> Calendar - Appointment Schedule
      </h1>
      <Calendar
        className="react-calendar2 w-full max-w-full mx-auto p-2 rounded-lg shadow-lg"
        tileClassName={({ date, view }) =>
          clsx(
            view === "month" &&
              date.getDate() === new Date().getDate() &&
              date.getMonth() === new Date().getMonth() &&
              date.getFullYear() === new Date().getFullYear() &&
              "bg-slate-900 text-blue-500"
          )
        }
      />
      <HeartRateCard />
      {/* <BloodPressureCard /> */}
      <div className="mt-6 w-full">
        <button className="px-4 py-2 w-full bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
          View more
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
