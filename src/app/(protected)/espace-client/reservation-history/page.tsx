"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { apiClient } from "@/lib/axios";
import { Reservation } from "@/types/Reservation";
import { PageHeader } from "./_components/PageHeader";
import {  ReservationList } from "./_components/ReservationList";
import { SortOrderButton } from "./_components/SortOrderButton";
import { TabNavigation } from "./_components/TabNavigation";
import { useCancelReservation } from "@/hooks/useCancelReservation";


export default function HistoryPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const router = useRouter();

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/sign-in");
        return;
      }

      const accessToken = session.access_token;

      // Use the API client instead of fetch
      const { data } = await apiClient.get("reservations/history/", {
        token: accessToken
      });
      
      setReservations(data);
      console.log("Fetched reservations:", data);
    } catch (err: any) {
      console.error("Error fetching history:", err);
      setError(err.message || "An error occurred while loading your reservation history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [router]);

  // Handle successful cancellation
  const handleCancellationSuccess = () => {
    // Update UI immediately
    setReservations(prevReservations => 
      prevReservations.map(res => 
        res.id === cancelLoading 
          ? {...res, status: 'cancelled'} 
          : res
      )
    );
    
    // Refresh the data after a short delay
    setTimeout(() => {
      fetchReservations();
    }, 500);
  };

  // Use the custom hook for cancellation
  const { cancelReservation, cancelLoading } = useCancelReservation(handleCancellationSuccess);

  // Filter reservations based on active tab
  const filteredReservations = reservations.filter(reservation => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") {
      return ["pending", "accepted"].includes(reservation.status);
    }
    if (activeTab === "completed") {
      return reservation.status === "completed";
    }
    if (activeTab === "cancelled") {
      return ["rejected", "cancelled"].includes(reservation.status);
    }
    return true;
  });

  // Sort reservations by date
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    const dateA = new Date(a.trajet_date_depart || a.created_at);
    const dateB = new Date(b.trajet_date_depart || b.created_at);
    
    return sortOrder === "desc" 
      ? dateB.getTime() - dateA.getTime() 
      : dateA.getTime() - dateB.getTime();
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "desc" ? "asc" : "desc");
  };

  // Retry loading if there was an error
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchReservations();
  };

  // View trip details
  const handleViewDetails = (trajetId: string) => {
    router.push(`/trip-details/${trajetId}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <PageHeader />

      <Card className="shadow-sm border-0">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Your Reservations</CardTitle>
              <CardDescription>
                Showing {filteredReservations.length} {activeTab !== "all" ? activeTab : ""} reservations
              </CardDescription>
            </div>
            <SortOrderButton 
              sortOrder={sortOrder} 
              onToggle={toggleSortOrder} 
            />
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          <TabsContent value={activeTab} className="m-0">
            <CardContent>
              <ReservationList 
                reservations={sortedReservations}
                loading={loading}
                error={error}
                activeTab={activeTab}
                cancelLoading={cancelLoading}
                onCancel={cancelReservation}
                onViewDetails={handleViewDetails}
                onRetry={handleRetry}
              />
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}