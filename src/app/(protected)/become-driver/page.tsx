"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerDriver } from "@/services/driverService";
import { createClient } from "@/utils/supabase/client";
import { Car, Upload } from "lucide-react";

export default function BecomeDriverPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlreadyDriver, setIsAlreadyDriver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const { data: { user: supabaseUser }, error: userError } = await supabase.auth.getUser();

      if (userError || !supabaseUser) {
        router.push("/sign-in");
        return;
      }

      setUser(supabaseUser);

      // Check if profile exists in profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id") // Minimal check for existence
        .eq("id", supabaseUser.id)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message || profileError);
        setError("Failed to fetch profile data");
        return;
      }

      if (!profile) {
        // Profile doesn't exist, redirect to sign-in instead of creating
        router.push("/sign-in");
        return;
      }

      // Check driver status from user_metadata
      setIsAlreadyDriver(supabaseUser.user_metadata?.role === 'driver');
    };

    fetchUserData();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    // Add user ID to form data
    if (user) {
      formData.append('user_id', user.id);
    }
    
    try {
      // 1. Register the driver in the Django backend
      const response = await registerDriver(formData);
      console.log('Driver registered successfully:', response);
      
      // 2. Update only the user's role in Supabase
      const supabase = createClient();
      
      // Update the user's metadata in auth.users
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { role: 'driver' }
      });
      
      if (metadataError) {
        throw new Error(`Failed to update user metadata: ${metadataError.message}`);
      }
      
      // Update the profile 'role' field if needed
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role: 'driver' })
        .eq('id', user.id);
      
      if (profileError) {
        throw new Error(`Failed to update profile: ${profileError.message}`);
      }
      
      // Redirect to driver dashboard
      router.push('/espace-driver');
    } catch (err: any) {
      console.error('Error registering driver:', err);
      setError(err.response?.data?.error || err.message || 'Failed to register as driver. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAlreadyDriver) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg border-0">
          <CardHeader className="pb-6">
            <div className="w-full flex justify-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Car className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">You are already registered as a driver</CardTitle>
            <CardDescription className="text-center text-gray-600 mt-2">
              Access your driver dashboard to manage your rides.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-2 pb-6">
            <Button
              onClick={() => router.push("/espace-driver")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              Go to Driver Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="pb-6">
          <div className="w-full flex justify-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <Car className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Become a Driver</CardTitle>
          <CardDescription className="text-center text-gray-600 mt-2">
            Register your vehicle to start earning as a driver.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="marque" className="text-sm font-medium text-gray-700">Car Model</Label>
              <Input 
                id="marque" 
                name="marque" 
                placeholder="Toyota Camry, etc." 
                className="h-11 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                required 
              />
              <p className="text-xs text-gray-500 mt-1">Enter the make and model of your vehicle</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="matricule" className="text-sm font-medium text-gray-700">License Plate Number</Label>
              <Input 
                id="matricule" 
                name="matricule" 
                placeholder="Enter license plate" 
                className="h-11 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                required 
              />
              <p className="text-xs text-gray-500 mt-1">Your vehicle registration number</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium text-gray-700">Vehicle Image</Label>
              <div className="mt-1 flex flex-col border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
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
                    <img src={previewUrl} alt="Vehicle preview" className="object-cover w-full h-full" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-3 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">Upload an image of your vehicle</p>
                  </div>
                )}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 bg-white border border-gray-300 rounded-md py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {previewUrl ? "Change Image" : "Select Image"}
                </Button>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-md mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register as Driver"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}