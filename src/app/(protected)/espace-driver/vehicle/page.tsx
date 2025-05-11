"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CarFront, Upload, X, Check, AlertCircle, Camera } from "lucide-react";
import Image from "next/image";

interface VehicleData {
  id_voiture: number;
  marque: string;
  matricule: string;
  image: string | null;
}

export default function VehicleManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [vehicle, setVehicle] = useState<VehicleData | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    marque: "",
    matricule: "",
  });
  
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        
        // Get auth token
        const supabase = createClient();
        const { data: sessionData } = await supabase.auth.getSession();
        
        if (!sessionData.session) {
          router.push("/sign-in");
          return;
        }
        
        // For demo purposes, using mock data
        // In a real implementation, you'd fetch this from your API
        await mockFetchVehicle();
      } catch (err: any) {
        console.error("Error fetching vehicle data:", err);
        setError(err.message || "Failed to load your vehicle information");
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicleData();
  }, [router]);
  
  // Mock API call
  const mockFetchVehicle = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock data
    const mockVehicle = {
      id_voiture: 1,
      marque: "Toyota Camry",
      matricule: "123 TN 4567",
      image: "/car-placeholder.jpg"
    };
    
    setVehicle(mockVehicle);
    setFormData({
      marque: mockVehicle.marque,
      matricule: mockVehicle.matricule,
    });
    
    if (mockVehicle.image) {
      setPreviewUrl(mockVehicle.image);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Validate form
      if (!formData.marque || !formData.matricule) {
        throw new Error("Please fill in all required fields");
      }
      
      // Get auth token
      const supabase = createClient();
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        throw new Error("Authentication required");
      }
      
      // In a real implementation, you'd make an API call to update the vehicle
      // For demo, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the state
      setVehicle(prev => prev ? {
        ...prev,
        marque: formData.marque,
        matricule: formData.matricule
      } : null);
      
      setSuccess("Vehicle information updated successfully");
    } catch (err: any) {
      console.error("Error updating vehicle:", err);
      setError(err.message || "Failed to update vehicle information");
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="mb-6">
          <Skeleton className="h-8 w-56 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        
        <Card className="shadow-sm">
          <CardHeader>
            <Skeleton className="h-6 w-36 mb-2" />
            <Skeleton className="h-4 w-full max-w-sm" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  if (!vehicle) {
    return (
      <div className="container mx-auto p-4 max-w-3xl">
        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Vehicle Not Found</h2>
            <p className="text-gray-600 mb-6 text-center">
              We couldn't find your vehicle information. Please register as a driver first.
            </p>
            <Button onClick={() => router.push("/become-driver")}>
              Become a Driver
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <p className="text-gray-500">
          Manage your vehicle information to keep your profile up to date
        </p>
      </div>
      
      <Card className="shadow-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Vehicle Information</CardTitle>
            <CardDescription>
              Provide accurate information about your vehicle for passengers to identify it
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="p-4 bg-green-50 text-green-700 rounded-md flex items-start">
                <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <p>{success}</p>
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
                onChange={handleChange}
                placeholder="e.g., Toyota Camry, Honda Civic"
                required
              />
              <p className="text-sm text-gray-500">
                Enter the make and model of your vehicle
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="matricule">
                License Plate <span className="text-red-500">*</span>
              </Label>
              <Input
                id="matricule"
                name="matricule"
                value={formData.matricule}
                onChange={handleChange}
                placeholder="e.g., 123 TN 4567"
                required
              />
              <p className="text-sm text-gray-500">
                Enter your vehicle's license plate number
              </p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <Label>Vehicle Image</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center">
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
                    <div className="relative w-full h-40 rounded-md overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Vehicle preview"
                        className="object-cover w-full h-full"
                        width={320}
                        height={180}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewUrl(null)}
                      className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <Camera className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-500 mb-2">
                      Upload a photo of your vehicle
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                      JPG, PNG or GIF, max 5MB
                    </p>
                  </div>
                )}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? "Change Image" : "Select Image"}
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                A clear photo helps passengers identify your vehicle
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/espace-driver")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <span className="mr-2">Saving...</span>
                  <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}