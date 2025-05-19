import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const EmptyState: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-8 text-center text-gray-500">
        <p>No matching trips found. Try adjusting your search criteria.</p>
      </CardContent>
    </Card>
  );
};