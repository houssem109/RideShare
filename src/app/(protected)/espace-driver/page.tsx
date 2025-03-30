// app/(protected)/become-driver/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerDriver } from '@/services/driverService';
import { createClient } from "@/utils/supabase/client";

export default function BecomeDriverPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlreadyDriver, setIsAlreadyDriver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  useEffect(() => {
    // Get the current user from Supabase
    const fetchUserData = async () => {
      const supabase = createClient();
      const { data: { user: supabaseUser } } = await supabase.auth.getUser();
      
      if (supabaseUser) {
        setUser(supabaseUser);
        
        // Get the user's profile directly from Supabase
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', supabaseUser.id)
          .single();
        
        // Check if user is already a driver
        if (profile?.role === 'driver') {
          setIsAlreadyDriver(true);
        }
      } else {
        // Redirect if not logged in
        router.push('/sign-in');
      }
    };
    
    fetchUserData();
  }, [router]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
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
      
      // 2. Update the user's role in Supabase
      const supabase = createClient();
      
      // Update the profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          role: 'driver',
          car_info: {
            marque: formData.get('marque'),
            matricule: formData.get('matricule')
          }
        })
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
      <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">You are already registered as a driver</CardTitle>
            <CardDescription className="text-center">
              You can access your driver dashboard to manage your rides.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button 
              onClick={() => router.push('/espace-driver')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Go to Driver Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Become a Driver</CardTitle>
          <CardDescription className="text-center">
            Register your vehicle to start earning as a driver.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="marque">Car Model</Label>
              <Input 
                id="marque" 
                name="marque" 
                placeholder="Toyota Camry, Honda Civic, etc." 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="matricule">License Plate Number</Label>
              <Input 
                id="matricule" 
                name="matricule" 
                placeholder="Enter vehicle license plate" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Vehicle Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  Select Image
                </Button>
                {previewUrl && (
                  <div className="relative w-16 h-16 overflow-hidden rounded-md">
                    <img 
                      src={previewUrl} 
                      alt="Vehicle preview" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
              {previewUrl && (
                <p className="text-xs text-muted-foreground mt-1">Image selected</p>
              )}
            </div>
            
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register as Driver"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}