import React from "react";

export const LoadingState: React.FC = () => {
  return (
    <div className="container mx-auto p-4 h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Loading trip details...</p>
      </div>
    </div>
  );
};