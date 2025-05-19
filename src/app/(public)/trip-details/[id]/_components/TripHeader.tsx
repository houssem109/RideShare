import React from "react";
import { Button } from "@/components/ui/button";

interface TripHeaderProps {
  onBack: () => void;
}

export const TripHeader: React.FC<TripHeaderProps> = ({ onBack }) => {
  return (
    <div className="mb-6">
      <Button variant="outline" size="sm" onClick={onBack} className="mb-4">
        &larr; Back
      </Button>
      <h1 className="text-3xl font-bold text-[#652CB3]">Trip Details</h1>
      <p className="text-muted-foreground">View complete information about this trip</p>
    </div>
  );
};
