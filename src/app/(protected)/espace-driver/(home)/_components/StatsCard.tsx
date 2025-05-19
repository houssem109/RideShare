import React, { ReactNode } from 'react';
import {
  Card,
  CardContent
} from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
  footer?: ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  iconBgColor,
  iconColor,
  footer
}) => {
  return (
    <Card className="shadow-sm bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-3xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`${iconBgColor} p-2 rounded-full`}>
            <div className={`h-6 w-6 ${iconColor}`}>
              {icon}
            </div>
          </div>
        </div>
        {footer && (
          <div className="mt-2 flex items-center text-sm">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
};