import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message, 
  onRetry 
}) => {
  return (
    <div className="text-center py-8">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Reservations</h3>
      <p className="text-gray-500 mb-4">{message}</p>
      <Button onClick={onRetry} className="mx-auto">
        <RefreshCw className="h-4 w-4 mr-2" /> Try Again
      </Button>
    </div>
  );
};
