import React from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onBack: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onBack }) => {
  return (
    <div className="container mx-auto p-4">
      <Card className="border-red-200">
        <CardHeader className="text-center">
          <CardTitle className="text-red-600">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">{message}</p>
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
