import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
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

interface RatingDistributionChartProps {
  ratings: { rating: number; count: number }[];
}

export const RatingDistributionChart: React.FC<RatingDistributionChartProps> = ({
  ratings
}) => {
  // Pie chart colors
  const RATING_COLORS = ['#22c55e', '#60a5fa', '#facc15', '#f97316', '#ef4444'];
  
  return (
    <Card className="shadow-sm bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Rating Distribution</CardTitle>
        <CardDescription>Breakdown of your ratings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ratings}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name: string; percent: number }) => 
                  `${name} stars (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                nameKey="rating"
              >
                {ratings.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RATING_COLORS[index % RATING_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
