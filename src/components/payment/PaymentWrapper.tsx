// src/components/payment/PaymentWrapper.tsx
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import DirectPayment from "./DirectPayment";

// Load Stripe outside of component rendering to avoid recreating Stripe object
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentWrapperProps {
  trajetId: number;
  price: number;
  driverName: string;
}

export default function PaymentWrapper({
  trajetId,
  price,
  driverName,
}: PaymentWrapperProps) {
  return (
    <Elements stripe={stripePromise}>
      <DirectPayment
        trajetId={trajetId}
        price={price}
        driverName={driverName}
      />
    </Elements>
  );
}