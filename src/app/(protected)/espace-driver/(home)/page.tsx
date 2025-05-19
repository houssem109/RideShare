"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

// Import API services
import { 
  getDriverStats, 
  getDriverTrips
} from "@/services/driverDashboardService";
import { DriverStats, TripSummary } from "@/types/TripSummary";
import { DashboardHeader } from "./_components/DashboardHeader";
import { DriverStatsGrid } from "./_components/DriverStatsGrid";
import { EmptyState } from "./_components/EmptyState";
import { ErrorState } from "./_components/ErrorState";
import { LoadingState } from "./_components/LoadingState";
import { PerformanceTabs } from "./_components/PerformanceTabs";
import { RecentTripsCard } from "./_components/RecentTripsCard";
import { TripStatusOverview } from "./_components/TripStatusOverview";

// Import components

export default function DriverDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DriverStats | null>(null);
  const [recentTrips, setRecentTrips] = useState<TripSummary[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        setLoading(true);
        const supabase = createClient();
        const { data: sessionData } = await supabase.auth.getSession();

        if (!sessionData.session) {
          router.push("/sign-in");
          return;
        }

        setToken(sessionData.session.access_token);

        const [statsData, tripsData] = await Promise.all([
          getDriverStats(sessionData.session.access_token),
          getDriverTrips(sessionData.session.access_token),
        ]);

        const processedTrips = tripsData.map((trip: any) => ({
          ...trip,
          price: parseFloat(trip.price), // Convert price to number
          booking_count: trip.nb_places - trip.nb_places,
        })).slice(0, 3);

        setStats(statsData);
        setRecentTrips(processedTrips);
      } catch (err: any) {
        console.error("Error loading driver dashboard:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, [router]);

  // Handle retry loading
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    if (token) {
      Promise.all([
        getDriverStats(token),
        getDriverTrips(token)
      ]).then(([statsData, tripsData]) => {
        const processedTrips = tripsData.map((trip: any) => ({
          ...trip,
          booking_count: trip.nb_places - trip.nb_places, // Calculate booked seats
        })).slice(0, 3);
        
        setStats(statsData);
        setRecentTrips(processedTrips);
        setLoading(false);
      }).catch(err => {
        console.error("Error retrying data fetch:", err);
        setError(err.message || "Failed to load dashboard data");
        setLoading(false);
      });
    } else {
      setError("No authentication token available");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  if (!stats) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      {/* Dashboard Header */}
      <DashboardHeader 
        title="Driver Dashboard" 
        description="Welcome back. Here's your performance overview." 
      />

      {/* Quick Stats Cards */}
      <DriverStatsGrid stats={stats} />

      {/* Tabbed Performance Stats */}
      <PerformanceTabs stats={stats} />

      {/* Recent Trips */}
      <div className="mb-8">
        <RecentTripsCard trips={recentTrips} />
      </div>

      {/* Trip Status Overview */}
      <TripStatusOverview stats={stats} />
    </div>
  );
}