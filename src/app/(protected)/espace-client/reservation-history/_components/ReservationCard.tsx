import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, CreditCard, CheckCircle } from "lucide-react";
import { Reservation } from '@/types/Reservation';
import { formatDate, formatTime } from '@/utils/helpers';
import { PaymentMethodIcon } from './PaymentMethodIcon';
import { StatusBadge } from './StatusBadge';
import { StatusIcon } from './StatusIcon';
import { useRouter } from 'next/navigation';

interface ReservationCardProps {
  reservation: Reservation;
  onCancel: (id: string) => void;
  onViewDetails: (trajetId: string) => void;
  cancelLoading: string | null;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  onCancel,
  onViewDetails,
  cancelLoading
}) => {
  const router = useRouter();
  
  const getBgColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-50";
      case "accepted": return "bg-blue-50";
      case "completed": return "bg-green-50";
      case "rejected":
      case "cancelled": return "bg-gray-50";
      default: return "bg-white";
    }
  };

  // Check if payment is needed (status is accepted, payment method is online, and not paid)
  const needsPayment = 
    reservation.status === "accepted" && 
    reservation.payment_method === "online" && 
    reservation.etat !== "paye";
  
  // Check if payment is completed
  const paymentCompleted = 
    reservation.payment_method === "online" && 
    reservation.etat === "paye";

  // Handle payment button click
  const handlePayment = () => {
    router.push(`/trips/pay/${reservation.trajet_id}`);
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:border-indigo-200 transition-colors">
      <div className={`
        p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
        ${getBgColor(reservation.status)}
      `}>
        {/* Status and Route */}
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <StatusIcon status={reservation.status} />
          </div>
          <div>
            <div className="flex items-center gap-1 font-medium text-gray-900">
              <span>{reservation.trajet_depart}</span>
              <ArrowRight className="h-3 w-3 text-gray-400" />
              <span>{reservation.trajet_arrivee}</span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(reservation.trajet_date_depart)}</span>
              <Clock className="h-3 w-3 ml-2" />
              <span>{formatTime(reservation.trajet_date_depart)}</span>
            </div>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="flex items-center">
          <StatusBadge status={reservation.status} />
        </div>
      </div>
      
      <div className="p-4 bg-white">
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          {/* Reservation Details */}
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Passenger</div>
            <div className="font-medium">{reservation.prenom} {reservation.nom}</div>
            <div className="text-sm text-gray-500">{reservation.tel}</div>
          </div>
          
          {/* Payment Info */}
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Payment Method</div>
            <div className="flex items-center gap-2">
              <PaymentMethodIcon method={reservation.payment_method} />
              <span className="font-medium">
                {reservation.payment_method === "cash" ? "Cash" : "Online Payment"}
              </span>
            </div>
            {reservation.payment_method === "online" && (
              <div className="flex items-center gap-1 text-sm">
                {paymentCompleted ? (
                  <div className="text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Paid
                  </div>
                ) : (
                  <div className="text-amber-600">
                    Not paid
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Booking Date */}
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Booked On</div>
            <div className="font-medium">
              {formatDate(reservation.created_at)}
            </div>
            <div className="text-sm text-gray-500">
              {formatTime(reservation.created_at)}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t flex justify-end gap-2">
          {/* Show Cancel button for pending reservations */}
          {reservation.status === "pending" && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => onCancel(reservation.id)}
              disabled={cancelLoading === reservation.id}
            >
              {cancelLoading === reservation.id ? (
                <>
                  <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Cancelling...
                </>
              ) : "Cancel Reservation"}
            </Button>
          )}
          
          {/* Show Payment button for accepted online reservations that need payment */}
          {needsPayment && (
            <Button 
              size="sm" 
              className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
              onClick={handlePayment}
            >
              <CreditCard className="h-4 w-4" />
              Pay Now
            </Button>
          )}
          
          {/* View Details button */}
          <Button 
            size="sm" 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => onViewDetails(reservation.trajet_id)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};