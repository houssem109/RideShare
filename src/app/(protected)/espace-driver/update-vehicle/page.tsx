"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { apiClient } from "@/lib/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Car,
  Camera,
  Upload,
  X,
  Save,
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Loader2
} from "lucide-react";
import Image from "next/image";

export default function UpdateVehiclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [vehicleData, setVehicleData] = useState({
    marque: "",
    matricule: "",
  });
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get authentication token
        const supabase = createClient();
        const { data } = await supabase.auth.getSession();

        if (!data.session?.access_token) {
          throw new Error("Authentication required");
        }

        // Fetch the driver's vehicle data
        const response = await apiClient.get("voitures/", {
          token: data.session.access_token
        });

        if (response.data && response.data.length > 0) {
          const vehicle = response.data[0]; // Get the first vehicle (drivers only have one)
          setVehicleData({
            marque: vehicle.marque,
            matricule: vehicle.matricule,
          });

          // Set current image if available
          if (vehicle.image) {
            // Construct the full URL based on your API's image path
            const imageUrl = vehicle.image.startsWith('http') 
              ? vehicle.image 
              : `http://localhost:8000/${vehicle.image.startsWith('/') ? vehicle.image.substring(1) : vehicle.image}`;
            setCurrentImage(imageUrl);
          }
        } else {
          throw new Error("No vehicle found");
        }
      } catch (err: any) {
        console.error("Error fetching vehicle data:", err);
        setError(err.message || "Failed to load vehicle data");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate form
      if (!vehicleData.marque || !vehicleData.matricule) {
        throw new Error("Please fill in all required fields");
      }

      // Get authentication token
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();

      if (!data.session?.access_token) {
        throw new Error("Authentication required");
      }

      // Create FormData for the request
      const formData = new FormData();
      formData.append("marque", vehicleData.marque);
      formData.append("matricule", vehicleData.matricule);
      
      // Add image only if a new one was selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Update vehicle
      const response = await fetch("http://localhost:8000/api/update-vehicle/", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${data.session.access_token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update vehicle");
      }

      // Show success message
      setSuccess("Vehicle information updated successfully");
      
      // After 2 seconds, redirect back to driver dashboard
      setTimeout(() => {
        router.push("/espace-driver");
      }, 2000);
    } catch (err: any) {
      console.error("Error updating vehicle:", err);
      setError(err.message || "Failed to update vehicle information");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
            <p className="text-gray-600">Loading your vehicle information...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Button>

      <Card className="shadow-lg border-0 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-indigo-600" />
            <CardTitle>Update Vehicle Information</CardTitle>
          </div>
          <CardDescription>
            Make changes to your vehicle details below
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <p>{success}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="marque" className="font-medium">
                Car Model <span className="text-red-500">*</span>
              </Label>
              <Input
                id="marque"
                name="marque"
                value={vehicleData.marque}
                onChange={handleInputChange}
                placeholder="e.g., Toyota Camry, Honda Civic"
                className="h-11"
                required
              />
              <p className="text-sm text-gray-500">
                Enter the make and model of your vehicle
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="matricule" className="font-medium">
                License Plate <span className="text-red-500">*</span>
              </Label>
              <Input
                id="matricule"
                name="matricule"
                value={vehicleData.matricule}
                onChange={handleInputChange}
                placeholder="e.g., 123 TN 4567"
                className="h-11"
                required
              />
              <p className="text-sm text-gray-500">
                Enter your vehicle&apos;s license plate number
              </p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Label className="font-medium">Vehicle Image</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 transition-all hover:border-indigo-300">
                <Input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="relative">
                    <div className="w-full h-48 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={previewUrl}
                        alt="Vehicle preview"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-red-100 text-red-600 p-1 rounded-full hover:bg-red-200 transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : currentImage ? (
                  <div className="relative">
                    <div className="w-full h-48 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
  src={currentImage}
  alt="Current vehicle image"
  className="w-full h-full object-cover"
/>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs py-1 px-2 rounded">
                      Current image
                    </div>
                  </div>
                ) : (
                  <div 
                    className="flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500 text-center mb-2">
                      Click to upload a photo of your vehicle
                    </p>
                    <p className="text-xs text-gray-400 text-center">
                      JPG, PNG or GIF, max 5MB
                    </p>
                  </div>
                )}

                {(previewUrl || currentImage) && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4 mx-auto block"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Image
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                A clear photo helps passengers identify your vehicle
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 pt-2 pb-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={updating}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={updating}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {updating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}