import React from "react";
import { User } from "lucide-react";

interface DriverInfoProps {
  name: string;
  phone: string;
}

export const DriverInfo: React.FC<DriverInfoProps> = ({ name, phone }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <User className="h-5 w-5 text-[#652CB3]" />
        Driver Information
      </h3>
      <div className="mt-3 space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Name:</span>
          <span className="font-medium">{name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Phone:</span>
          <span className="font-medium">{phone}</span>
        </div>
      </div>
    </div>
  );
};
