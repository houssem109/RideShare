import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingState: React.FC = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex flex-col p-4 border rounded-lg">
          <div className="flex justify-between items-start">
            <Skeleton className="h-4 w-1/3 mb-2" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex gap-4 mb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-12 w-full mt-2" />
        </div>
      ))}
    </div>
  );
};