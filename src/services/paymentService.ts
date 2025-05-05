// src/services/paymentService.ts

import { apiClient } from "@/lib/axios";

export const createPaymentIntent = async (
    trajetId: number,
    token: string
  ) => {
    try {
      console.log("Sending payment intent request:", { trajetId, token });
      
      const response = await apiClient.post("create-payment-intent/", {
        body: { trajet_id: trajetId },
        token
      });
      
      console.log("Payment intent response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Payment intent error:", error);
      throw error;
    }
  };

export const getPassengerBookings = async (token: string) => {
  const response = await apiClient.get("passenger-bookings/", {
    token
  });
  
  return response.data;
};

export const getDriverEarnings = async (token: string) => {
  const response = await apiClient.get("driver-earnings/", {
    token
  });
  
  return response.data;
};

// src/services/paymentService.ts

// src/services/paymentService.ts

export const initiateStripeOnboarding = async (email: string, token: string) => {
    try {
      console.log("Starting Stripe onboarding with email:", email);
      
      // Make sure your body parameter is correctly structured
      const response = await apiClient.post("driver-stripe-onboarding/", {
        body: { email },  // This should match what your backend expects
        token
      });
      
      console.log("Stripe onboarding response:", response);
      return response.data;
    } catch (error) {
      console.error("Stripe onboarding error:", error);
      throw error;
    }
  };
export const checkStripeAccountStatus = async (token: string) => {
  const response = await apiClient.get("check-stripe-account-status/", {
    token
  });
  
  return response.data;
};