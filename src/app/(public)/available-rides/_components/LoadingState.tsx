import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const LoadingState: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading available trips...</p>
      </CardContent>
    </Card>
  );
};
