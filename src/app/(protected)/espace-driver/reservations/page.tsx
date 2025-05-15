// src/app/(protected)/espace-driver/reservations/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReservationManagement from "@/components/driver/ReservationManagement";

export default function DriverReservationsPage() {
  const [activeTab, setActiveTab] = useState("all");

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

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="m-0">
            <CardContent>
              <ReservationManagement showAll={true} />
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}