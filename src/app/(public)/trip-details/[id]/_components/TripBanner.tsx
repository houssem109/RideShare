import React from "react";
import { MapPin, Flag } from "lucide-react";

interface TripBannerProps {
  departure: string;
  arrival: string;
  price: number | string;
}

export const TripBanner: React.FC<TripBannerProps> = ({ 
  departure, 
  arrival, 
  price 
}) => {
  const formattedPrice = typeof price === 'number' 
    ? price.toFixed(2) 
    : parseFloat(String(price)).toFixed(2);

  return (
    <div className="relative h-40 bg-gradient-to-r from-[#652CB3] to-[#8058C4]">
      <div className="absolute inset-0 flex items-center justify-between px-6">
        <div className="text-white">
          <h2 className="text-2xl font-bold mb-1">{departure}</h2>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Starting point</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-20 h-px bg-white/50 my-2"></div>
          <div className="px-4 py-1 bg-white rounded-full text-[#652CB3] font-bold text-lg">
            {formattedPrice} TND
          </div>
        </div>
        
        <div className="text-white text-right">
          <h2 className="text-2xl font-bold mb-1">{arrival}</h2>
          <div className="flex items-center gap-2 justify-end">
            <span>Destination</span>
            <Flag className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};