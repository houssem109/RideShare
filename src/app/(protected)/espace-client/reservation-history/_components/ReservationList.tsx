import { Reservation } from '@/types/Reservation';
import React from 'react';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { LoadingState } from './LoadingState';
import { ReservationCard } from './ReservationCard';


interface ReservationListProps {
  reservations: Reservation[];
  loading: boolean;
  error: string | null;
  activeTab: string;
  cancelLoading: string | null;
  onCancel: (id: string) => void;
  onViewDetails: (trajetId: string) => void;
  onRetry: () => void;
}

export const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  loading,
  error,
  activeTab,
  cancelLoading,
  onCancel,
  onViewDetails,
  onRetry
}) => {
  if (loading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }
  
  if (reservations.length === 0) {
    return <EmptyState activeTab={activeTab} />;
  }
  
  return (
    <div className="space-y-4 mt-2">
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onCancel={onCancel}
          onViewDetails={onViewDetails}
          cancelLoading={cancelLoading}
        />
      ))}
    </div>
  );
};