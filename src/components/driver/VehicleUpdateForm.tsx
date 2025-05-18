// src/components/driver/VehicleUpdateForm.tsx

"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { updateVehicle } from "@/services/driverService";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Car, Upload, X } from "lucide-react";
import Image from "next/image";

interface VehicleUpdateFormProps {
  vehicleId: number;
  initialData?: {
    marque: string;
    matricule: string;
    image?: string | null;
  };
  onSuccess?: () => void;
}

export default function VehicleUpdateForm({ 
  vehicleId, 
  initialData,
  onSuccess
}: VehicleUpdateFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    marque: initialData?.marque || "",
    matricule: initialData?.matricule || "",
  });

  // Set initial preview if image exists
  useEffect(() => {
    if (initialData?.image) {
      setPreviewUrl(initialData.image);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Check authentication
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Authentication required");
      }

      // Create FormData for the API call
      const formDataToSend = new FormData();
      formDataToSend.append("marque", formData.marque);
      formDataToSend.append("matricule", formData.matricule);
      
      // Append image only if a new one was selected
      if (fileInputRef.current?.files?.length) {
        formDataToSend.append("image", fileInputRef.current.files[0]);
      }

      // Call API to update vehicle
      await updateVehicle(vehicleId, formDataToSend);
      
      setSuccess("Vehicle information updated successfully");
      
      // If callback exists, call it after successful update
      if (onSuccess) {
        onSuccess();
      }
      
      // Optionally redirect to another page
      // router.push('/espace-driver/vehicle');
      
    } catch (err: any) {
      console.error("Error updating vehicle:", err);
      setError(err.response?.data?.error || err.message || "Failed to update vehicle information");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5 text-indigo-600" /> 
          Update Vehicle Information
        </CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="p-3 rounded-md bg-green-50 text-green-600 text-sm">
              {success}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="marque">
              Car Model <span className="text-red-500">*</span>
            </Label>
            <Input
              id="marque"
              name="marque"
              value={formData.marque}
              onChange={handleInputChange}
              placeholder="Toyota Camry, Honda Civic, etc."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="matricule">
              License Plate <span className="text-red-500">*</span>
            </Label>
            <Input
              id="matricule"
              name="matricule"
              value={formData.matricule}
              onChange={handleInputChange}
              placeholder="License plate number"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Vehicle Image</Label>
            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />

              {previewUrl ? (
                <div className="relative w-full h-36 overflow-hidden rounded-md mb-2">
                  <Image
                    src={previewUrl}
                    alt="Vehicle preview"
                    width={400}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewUrl(null)}
                    className="absolute top-2 right-2 bg-red-100 p-1 rounded-full text-red-600 hover:bg-red-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-3 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Upload an image of your vehicle
                  </p>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 w-full"
              >
                {previewUrl ? "Change Image" : "Select Image"}
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}