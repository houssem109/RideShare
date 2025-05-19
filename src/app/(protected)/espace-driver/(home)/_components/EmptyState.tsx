import React from 'react';
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const EmptyState: React.FC = () => {
  const router = useRouter();
  
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card className="shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Driver Data Unavailable</h2>
          <p className="text-gray-600 mb-6 text-center">We couldn&apos;t retrieve your driver information. Please make sure you&apos;re registered as a driver.</p>
          <Button onClick={() => router.push("/become-driver")}>
            Become a Driver
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};