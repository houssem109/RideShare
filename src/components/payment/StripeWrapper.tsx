// src/components/payment/StripeWrapper.tsx
"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

// Load Stripe outside of component rendering to avoid recreating Stripe object
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeWrapperProps {
  trajetId: number;
  price: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function StripeWrapper({
  trajetId,
  price,
  onSuccess,
  onCancel,
}: StripeWrapperProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        trajetId={trajetId}
        price={price}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  );
}