import React from 'react';
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
    case "accepted":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Accepted</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
    case "rejected":
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
    case "cancelled":
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Cancelled</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};