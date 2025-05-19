import React from 'react';

export const PageHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">Reservation History</h1>
      <p className="text-gray-500 mt-1">
        Track all your past and upcoming trips
      </p>
    </div>
  );
};
