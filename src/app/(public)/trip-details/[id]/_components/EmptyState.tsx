import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onBack: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Trip Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">The trip you&lsquo;re looking for doesn&lsquo;t exist or has been removed.</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline" onClick={onBack}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};