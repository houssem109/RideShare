import React from 'react';
import TripCard from "./TripCard";
import { DriverTrip } from '@/types/Driver';

interface TripGridProps {
  trips: DriverTrip[];
  onDeleteTrip: (id: number) => void;
  onViewPassengers: (id: number) => void;
}

const TripGrid: React.FC<TripGridProps> = ({ 
  trips, 
  onDeleteTrip, 
  onViewPassengers 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard 
          key={trip.id} 
          trip={trip} 
          onDeleteTrip={onDeleteTrip}
          onViewPassengers={onViewPassengers}
        />
      ))}
    </div>
  );
};

export default TripGrid;