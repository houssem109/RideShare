import React from "react";
import Image from "next/image";
import { Car } from "lucide-react";
import { getImageUrl } from "@/utils/helpers";

interface VehicleInfoProps {
  carDetails: {
    id: number;
    marque: string;
    matricule: string;
    image: string | null;
    car_image_id: string | null;
  } | null;
}

export const VehicleInfo: React.FC<VehicleInfoProps> = ({ carDetails }) => {
    console.log("Car Details:", carDetails);
  return (
    <div>
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <Car className="h-5 w-5 text-[#652CB3]" />
        Vehicle Information
      </h3>
      
      {carDetails ? (
        <div className="space-y-4">
          {/* Car Image */}
          <div className="aspect-video relative rounded-lg overflow-hidden border bg-muted">
            {carDetails.image ? (
              <div className="w-full h-full">
                <Image
                  src={getImageUrl(carDetails.image) || ''}
                  alt={carDetails.marque}
                  className="w-full h-full object-cover"
                  width={500}
                  height={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Car className="h-16 w-16 text-muted-foreground opacity-50" />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Brand:</span>
              <span className="font-medium">{carDetails.marque}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">License plate:</span>
              <span className="font-medium">{carDetails.matricule}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-lg border border-dashed text-center text-muted-foreground">
          No vehicle information available
        </div>
      )}
    </div>
  );
};