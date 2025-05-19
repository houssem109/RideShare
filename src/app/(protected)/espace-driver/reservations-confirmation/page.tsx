// File: src/app/(protected)/espace-driver/reservations/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReservationManagement from "@/components/driver/ReservationManagement";

export default function Page() {
  const [activeTab, setActiveTab] = useState("all");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handle status change from ReservationManagement component
  const handleStatusChange = () => {
    // Trigger a refresh to update all tabs
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Reservations</h1>
        <p className="text-gray-500 mt-1">
          Review and respond to passenger reservation requests
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Passenger Reservations</CardTitle>
          <CardDescription>
            Accept or reject reservation requests from passengers
          </CardDescription>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </div>

          {/* Use a single TabsContent and conditionally render based on activeTab */}
          <CardContent>
            {/* Each status filter is rendered based on the active tab */}
            {activeTab === "all" && (
              <ReservationManagement 
                showAll={true} 
                filterStatus="all"
                onStatusChange={handleStatusChange}
                key={`all-${refreshTrigger}`}
              />
            )}
            {activeTab === "pending" && (
              <ReservationManagement 
                showAll={true} 
                filterStatus="pending"
                onStatusChange={handleStatusChange}
                key={`pending-${refreshTrigger}`}
              />
            )}
            {activeTab === "accepted" && (
              <ReservationManagement 
                showAll={true} 
                filterStatus="accepted"
                onStatusChange={handleStatusChange}
                key={`accepted-${refreshTrigger}`}
              />
            )}
            {activeTab === "rejected" && (
              <ReservationManagement 
                showAll={true} 
                filterStatus="rejected"
                onStatusChange={handleStatusChange}
                key={`rejected-${refreshTrigger}`}
              />
            )}
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}