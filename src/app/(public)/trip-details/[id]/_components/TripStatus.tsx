import React from "react";
import { CheckSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/utils/helpers";

interface TripStatusProps {
  status: string;
  availableSeats: number;
}

export const TripStatus: React.FC<TripStatusProps> = ({ 
  status, 
  availableSeats 
}) => {
  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <div>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <CheckSquare className="h-5 w-5 text-[#652CB3]" />
        Trip Status
      </h3>
      <div className="mt-3">
        <Badge 
          className={getStatusColor(status)}
          variant="outline"
        >
          {displayStatus}
        </Badge>
        <div className="mt-2">
          <span className="text-muted-foreground">Available seats:</span>
          <span className="font-medium ml-2">{availableSeats}</span>
        </div>
      </div>
    </div>
  );
};