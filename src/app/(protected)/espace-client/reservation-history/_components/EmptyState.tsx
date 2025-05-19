import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface EmptyStateProps {
  activeTab: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ activeTab }) => {
  const router = useRouter();
  
  return (
    <div className="text-center py-10">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Calendar className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">No Reservations Found</h3>
      <p className="text-gray-500 mb-4">
        {activeTab === "all" 
          ? "You haven't made any reservations yet." 
          : `You don't have any ${activeTab} reservations.`}
      </p>
      <Button onClick={() => router.push("/available-rides")} className="mx-auto">
        Find Trips
      </Button>
    </div>
  );
};

