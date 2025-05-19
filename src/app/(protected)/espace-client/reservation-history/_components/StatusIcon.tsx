import React from 'react';
import { Clock8, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface StatusIconProps {
  status: string;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case "pending":
      return <Clock8 className="h-5 w-5 text-yellow-500" />;
    case "accepted":
      return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "cancelled":
      return <XCircle className="h-5 w-5 text-gray-500" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />;
  }
};