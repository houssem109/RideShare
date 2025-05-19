import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";

interface MonthlyTripsChartProps {
  monthlyData: { month: string; trips: number }[];
}

export const MonthlyTripsChart: React.FC<MonthlyTripsChartProps> = ({
  monthlyData
}) => {
  return (
    <Card className="shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Monthly Trips</CardTitle>
        <CardDescription>Number of trips per month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="trips" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};