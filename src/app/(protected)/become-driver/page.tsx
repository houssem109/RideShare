"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from "@/utils/supabase/client";

export default function BecomeDriverPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to become a driver");
        setIsSubmitting(false);
        return;
      }

      // Here you would collect and validate the driver information
      // This is a placeholder - implement your actual driver registration logic
      const formData = new FormData(e.currentTarget);
      const fullName = formData.get("fullName") as string;
      const licenseNumber = formData.get("licenseNumber") as string;
      const vehicleModel = formData.get("vehicleModel") as string;
      const vehicleYear = formData.get("vehicleYear") as string;

      if (!fullName || !licenseNumber || !vehicleModel || !vehicleYear) {
        setError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // 1. First, update user metadata to mark as driver
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          is_driver: true,
          driver_info: {
            license_number: licenseNumber,
            vehicle_model: vehicleModel,
            vehicle_year: vehicleYear
          }
        }
      });

      if (updateError) {
        throw updateError;
      }

      // 2. Optionally, insert into a drivers table in your database
      // Replace with your actual database schema
      const { error: insertError } = await supabase
        .from('drivers')
        .insert({
          user_id: user.id,
          full_name: fullName,
          license_number: licenseNumber,
          vehicle_model: vehicleModel,
          vehicle_year: vehicleYear,
          status: 'pending' // You might want to have an approval process
        });

      if (insertError) {
        throw insertError;
      }

      setSuccess("Successfully registered as a driver! Redirecting to driver dashboard...");
      
      // Redirect to driver dashboard after a delay
      setTimeout(() => {
        window.location.href = "/espace-driver";
      }, 2000);

    } catch (err) {
      console.error("Error becoming a driver:", err);
      if (err instanceof Error) {
        setError(err.message || "Failed to register as a driver. Please try again.");
      } else {
        setError("Failed to register as a driver. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Become a Driver</h1>
      
      {error && (
        <Alert variant="error" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert variant="success" className="mb-6">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div>
          <label htmlFor="licenseNumber" className="block text-sm font-medium mb-1">
            Driver&apos;s License Number
          </label>
          <input
            id="licenseNumber"
            name="licenseNumber"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vehicleModel" className="block text-sm font-medium mb-1">
              Vehicle Model
            </label>
            <input
              id="vehicleModel"
              name="vehicleModel"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          
          <div>
            <label htmlFor="vehicleYear" className="block text-sm font-medium mb-1">
              Vehicle Year
            </label>
            <input
              id="vehicleYear"
              name="vehicleYear"
              type="number"
              min="1990"
              max={new Date().getFullYear()}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit Application"}
          </Button>
        </div>
      </form>
      
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Benefits of Being a Driver</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Flexible working hours - drive when you want</li>
          <li>Competitive earnings - keep more of what you earn</li>
          <li>Meet new people and explore your city</li>
          <li>Be your own boss with our driver-friendly platform</li>
        </ul>
      </div>
    </div>
  );
}