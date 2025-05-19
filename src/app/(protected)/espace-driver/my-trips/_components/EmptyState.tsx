import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const EmptyState: React.FC = () => (
  <Card>
    <CardContent className="p-8 text-center text-gray-500">
      <p>No trips found. Create a new trip to get started.</p>
    </CardContent>
  </Card>
);

export default EmptyState;