import React from "react";
import { Share2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TripFooterProps {
  availableSeats: number;
  status: string;
  onShare: () => void;
  onBook: () => void;
}

export const TripFooter: React.FC<TripFooterProps> = ({
  availableSeats,
  status,
  onShare,
  onBook,
}) => {
  return (
    <div className="flex justify-between  w-full pt-4 pb-6">
      <Button
        variant="outline"
        size="sm"
        onClick={onShare}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <div className="ml-auto">
        {availableSeats > 0 && status === "active" ? (
          <Button
            onClick={onBook}
            className="flex  items-center gap-2 bg-[#652CB3] hover:bg-[#8058C4]"
          >
            <CreditCard className="h-4 w-4" />
            Book this trip
          </Button>
        ) : (
          <Button disabled className="flex items-center gap-2">
            {status === "completed" ? "Trip completed" : "No seats available"}
          </Button>
        )}
      </div>
    </div>
  );
};
