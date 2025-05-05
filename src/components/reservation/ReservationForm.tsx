// src/components/reservation/ReservationForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import StripeWrapper from "@/components/payment/StripeWrapper";
import { createClient } from "@/utils/supabase/client";
import { apiClient } from "@/lib/axios";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
interface ReservationFormProps {
  trajetId: number;
  price: number;
  tripDetails: {
    departure: string;
    arrival: string;
    departureDate: string;
    driverName: string;
  };
}

export default function ReservationForm({
  trajetId,
  price,
  tripDetails,
}: ReservationFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    tel: "",
    adresse: "",
  });
  
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
        setError("Veuillez remplir tous les champs obligatoires");
        return;
      }
      setError(null);
      setStep(2);
    }
  };
  
  const handlePreviousStep = () => {
    setStep(1);
  };
  
  const handleSubmitReservation = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      
      if (!data.session?.access_token) {
        throw new Error("Authentication required");
      }
      
      // Create reservation with cash payment
      const response = await apiClient.post("reservations/", {
        body: {
          trajet_id: trajetId,
          nom: formData.nom,
          prenom: formData.prenom,
          tel: formData.tel,
          adresse: formData.adresse || "",
          payment_method: "cash",
        },
        token: data.session.access_token,
      });
      
      // Redirect to success page
      router.push(`/reservation-success?id=${response.data.id}`);
      
    } catch (err: any) {
      setError(err.message || "Failed to create reservation");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePaymentSuccess = () => {
    router.push(`/reservation-success`);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {step === 1 
            ? "Détails de réservation" 
            : "Méthode de paiement"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <h3 className="font-medium mb-2">Détails du trajet</h3>
              <p className="text-sm">
                <span className="font-medium">De:</span> {tripDetails.departure}
              </p>
              <p className="text-sm">
                <span className="font-medium">À:</span> {tripDetails.arrival}
              </p>
              <p className="text-sm">
                <span className="font-medium">Date:</span> {new Date(tripDetails.departureDate).toLocaleString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Conducteur:</span> {tripDetails.driverName}
              </p>
              <p className="text-sm font-medium mt-2">
                Prix: {price.toFixed(2)} TND
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tel">Téléphone *</Label>
                <Input
                  id="tel"
                  name="tel"
                  type="tel"
                  value={formData.tel}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            {error && (
              <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
                {error}
              </div>
            )}
            
            <Button 
              onClick={handleNextStep}
              className="w-full"
            >
              Continuer
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <RadioGroup 
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border p-4 rounded-md">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex-1 cursor-pointer">
                  Paiement en espèces
                  <p className="text-sm text-gray-500">
                    Payer en espèces au conducteur lors du trajet
                  </p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-4 rounded-md">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="flex-1 cursor-pointer">
                  Paiement en ligne
                  <p className="text-sm text-gray-500">
                    Payer maintenant par carte bancaire
                  </p>
                </Label>
              </div>
            </RadioGroup>
            
            {paymentMethod === "online" ? (
              <div className="mt-6">
                <StripeWrapper
                  trajetId={trajetId}
                  price={price}
                  onSuccess={handlePaymentSuccess}
                  onCancel={handlePreviousStep}
                />
              </div>
            ) : (
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  disabled={isLoading}
                >
                  Retour
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSubmitReservation}
                  disabled={isLoading}
                >
                  {isLoading ? "Traitement..." : "Confirmer la réservation"}
                </Button>
              </div>
            )}
            
            {error && (
              <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md">
                {error}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}