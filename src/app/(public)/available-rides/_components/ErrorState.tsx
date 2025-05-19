import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  message: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <Card>
      <CardContent className="p-8 text-center text-red-500">
        <p>{message}</p>
      </CardContent>
    </Card>
  );
};