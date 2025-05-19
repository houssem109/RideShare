import React from 'react';
import {
  LineChart,
  Line,
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

interface MonthlyEarningsChartProps {
  monthlyData: { month: string; amount: number }[];
}

export const MonthlyEarningsChart: React.FC<MonthlyEarningsChartProps> = ({
  monthlyData
}) => {
  return (
    <Card className="shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Monthly Earnings</CardTitle>
        <CardDescription>Your earnings trend over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value: number) => `${value}`}
              />
              <Tooltip 
                formatter={(value:number) => [`${Number(value).toFixed(2)}`, "Earnings"]} 
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ r: 4, fill: "#22c55e" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
