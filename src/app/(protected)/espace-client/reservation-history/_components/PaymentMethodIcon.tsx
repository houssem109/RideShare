import React from 'react';
import { Banknote, CreditCard } from "lucide-react";

interface PaymentMethodIconProps {
  method: string;
}

export const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ method }) => {
  return method === "cash" ? 
    <Banknote className="h-4 w-4 text-green-600" /> : 
    <CreditCard className="h-4 w-4 text-blue-600" />;
};