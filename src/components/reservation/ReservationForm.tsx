// Updated ReservationForm component with user data pre-filled
"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Banknote, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Home, 
  ArrowRight, 
  Clock, 
  Loader2
} from "lucide-react";

interface ReservationFormProps {
  trajetId: number;
}

export default function ReservationForm({ trajetId }: ReservationFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [tripDetails, setTripDetails] = useState<any>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    tel: "",
    adresse: "",
  });

  // Fetch user data and trip details on component mount
  useEffect(() => {
    const fetchUserAndTripData = async () => {
      try {
        setLoadingUserData(true);
        const supabase = createClient();
        
        // Get user session and profile data
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Get user profile from the profiles table
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profileData) {
            // Pre-fill form data with user profile information
            setFormData({
              nom: profileData.last_name || user.user_metadata?.last_name || "",
              prenom: profileData.first_name || user.user_metadata?.first_name || "",
              tel: profileData.phone_number || user.user_metadata?.phone || "",
              adresse: "", // Keep address empty as required
            });
          } else {
            // If no profile, try to use metadata from auth
            setFormData({
              nom: user.user_metadata?.last_name || "",
              prenom: user.user_metadata?.first_name || "",
              tel: user.user_metadata?.phone || "",
              adresse: "",
            });
          }
        }
        
        // Fetch trip details
        if (trajetId) {
          const response = await fetch(`http://localhost:8000/api/trajets/${trajetId}/`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch trip details');
          }
          
          const data = await response.json();
          setTripDetails(data);
        }
      } catch (error) {
        console.error('Error fetching user or trip data:', error);
        setError('Could not load user or trip details. Please try again later.');
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchUserAndTripData();
  }, [trajetId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate form
      if (!formData.nom || !formData.prenom || !formData.tel) {
        setError("Please fill in all required fields");
        return;
      }
      setError(null);
      setStep(2);
    }
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate trajetId
      if (!trajetId) {
        throw new Error('Trip ID is missing. Please try again.');
      }

      // Get auth token
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      
      if (!data.session?.access_token) {
        throw new Error('Authentication required');
      }

      // Create reservation data
      const reservationData = {
        trajet_id: Number(trajetId), // Ensure it's a number
        passenger_id: data.session.user.id,
        nom: formData.nom,
        prenom: formData.prenom,
        tel: formData.tel,
        adresse: formData.adresse || "",
        payment_method: paymentMethod,
        notes: "",
      };

      console.log('Sending reservation data:', reservationData);

      // Make API request to create reservation
      const response = await fetch('http://localhost:8000/api/reservations/creer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.session.access_token}`
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create reservation');
      }

      // Handle success - redirect to confirmation page
      router.push('/reservation-success');
    } catch (err: any) {
      console.error('Error creating reservation:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loadingUserData) {
    return (
      <div className="max-w-md mx-auto p-4 flex items-center justify-center">
        <Card className="w-full text-center p-6">
          <div className="flex justify-center my-6">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
          </div>
          <p className="text-gray-600">Loading your information...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            {step === 1 ? "Reservation Details" : "Payment Method"}
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            {step === 1 
              ? "Verify or update your personal information" 
              : "Choose your preferred payment method"}
          </CardDescription>
        </CardHeader>

        {/* Trip Details Banner */}
        <div className="bg-indigo-50 p-4 mx-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-indigo-600 mr-1" />
              <span className="font-medium text-indigo-900">
                {tripDetails?.departure || "Loading..."}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-indigo-400" />
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-indigo-600 mr-1" />
              <span className="font-medium text-indigo-900">
                {tripDetails?.arrival || "Loading..."}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>
                {tripDetails?.departure_date 
                  ? formatDate(tripDetails.departure_date) 
                  : "Loading..."}
              </span>
            </div>
            <div className="flex items-center font-medium">
              <span className="text-indigo-600">
                {tripDetails?.price 
                  ? `${tripDetails.price} TND` 
                  : "..."}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom" className="text-sm font-medium">
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        className="pl-9 py-5"
                        placeholder="Your last name"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prenom" className="text-sm font-medium">
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        className="pl-9 py-5"
                        placeholder="Your first name"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tel" className="text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="tel"
                      name="tel"
                      type="tel"
                      value={formData.tel}
                      onChange={handleInputChange}
                      className="pl-9 py-5"
                      placeholder="Your phone number"
                      required
                    />
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse" className="text-sm font-medium">
                    Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="adresse"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                      className="pl-9 py-5"
                      placeholder="Your address (optional)"
                    />
                    <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="font-medium text-gray-700">Payment Method</h3>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${paymentMethod === 'cash' ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200'}`}>
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex flex-1 cursor-pointer">
                      <div className="mr-3">
                        <Banknote className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Cash Payment</div>
                        <p className="text-sm text-gray-500">
                          Pay directly to the driver during the trip
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-3 p-4 rounded-lg border transition-colors ${paymentMethod === 'online' ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200'}`}>
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex flex-1 cursor-pointer">
                      <div className="mr-3">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Online Payment</div>
                        <p className="text-sm text-gray-500">
                          Pay now by credit card or mobile payment
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === 'online' && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-700">
                      You will be redirected to our secure payment interface after confirmation.
                    </p>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md border border-red-100">
                {error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between py-6">
            {step === 1 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Continue
              </Button>
            ) : (
              <div className="flex w-full gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </div>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}