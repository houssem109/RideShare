"use client";

import { useState } from "react";

import { resendOtpAction } from "@/app/actions";
import { Button } from "@/components/ui/button";

export function ResendOtpButton({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    if (cooldown > 0 || isLoading) return;
    
    setIsLoading(true);
    
    // Create form data with the email
    const formData = new FormData();
    formData.append("email", email);
    
    try {
      // Call the resend action
      await resendOtpAction(formData);
      
      // Start cooldown
      setCooldown(60);
      const interval = setInterval(() => {
        setCooldown((current) => {
          if (current <= 1) {
            clearInterval(interval);
            return 0;
          }
          return current - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error("Error resending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      type="button" 
      variant="link" 
      onClick={handleResend} 
      disabled={cooldown > 0 || isLoading}
      className="p-0 h-auto"
    >
      {cooldown > 0 ? `Resend code (${cooldown}s)` : "Resend code"}
    </Button>
  );
}