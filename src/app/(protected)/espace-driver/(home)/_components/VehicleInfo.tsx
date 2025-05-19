import React from 'react';
import { CarFront } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { getImageUrl } from "@/utils/helpers";
import Image from 'next/image';

interface VehicleInfoProps {
  vehicle: {
    id: number;
    model: string;
    licensePlate: string;
    image: string | null;
  };
  totalDistance?: number;
}

export const VehicleInfo: React.FC<VehicleInfoProps> = ({
  vehicle,
  totalDistance
}) => {
  return (
    <Card className="shadow-sm bg-white mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Vehicle Information</CardTitle>
        <CardDescription>Details of your registered vehicle</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-full md:w-1/3 bg-gray-100 rounded-lg overflow-hidden">
            {vehicle.image ? (
              <Image
                src={getImageUrl(vehicle.image) || ''}
                alt={vehicle.model}
                className="w-full h-48 object-cover"
                width={300}
                height={200}
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                <CarFront className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="text-xl font-semibold mb-4">{vehicle.model}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">License Plate</p>
                <p className="text-lg font-medium">{vehicle.licensePlate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Vehicle ID</p>
                <p className="text-lg font-medium">{vehicle.id}</p>
              </div>
              {totalDistance !== undefined && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Distance</p>
                  <p className="text-lg font-medium">{totalDistance.toFixed(0)} km</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
