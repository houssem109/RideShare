import React from "react";
import { Calendar } from "lucide-react";
import { formatDate, formatTime } from "@/utils/helpers";

interface TripScheduleProps {
  departureDate: string;
  arrivalDate: string;
}

export const TripSchedule: React.FC<TripScheduleProps> = ({
  departureDate,
  arrivalDate
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Calendar className="h-5 w-5 text-[#652CB3]" />
        Trip Schedule
      </h3>
      <div className="mt-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Departure:</span>
          <span className="font-medium">
            {formatDate(departureDate)} at {formatTime(departureDate)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Arrival:</span>
          <span className="font-medium">
            {formatDate(arrivalDate)} at {formatTime(arrivalDate)}
          </span>
        </div>
      </div>
    </div>
  );
};