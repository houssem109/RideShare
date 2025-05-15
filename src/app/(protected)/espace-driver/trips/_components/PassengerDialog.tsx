// src/components/driver/trips/_components/PassengerDialog.tsx
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReservationManagement from "@/components/driver/ReservationManagement";

interface PassengerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: number;
}

const PassengerDialog: React.FC<PassengerDialogProps> = ({ 
  isOpen, 
  onClose, 
  tripId 
}) => {
  const handleStatusChange = () => {
    // Optionally refresh some data in the parent component
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Passenger Reservations</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <ReservationManagement 
            tripId={tripId} 
            showAll={true}
            onStatusChange={handleStatusChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PassengerDialog;