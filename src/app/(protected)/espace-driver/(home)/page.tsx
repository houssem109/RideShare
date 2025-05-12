"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Calendar,
  CarFront,
  CheckCircle2,
  Clock,
  DollarSign,
  LayoutDashboard,
  MapPin,
  TrendingUp,
  Users,
  Star,
  Route,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  LineChart, 
  BarChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Import API services
import { 
  getDriverStats, 
  getDriverTrips, 
  getDriverVehicle 
} from "@/services/driverDashboardService";

// Type definitions
interface TripSummary {
  id: number;
  departure: string;
  arrival: string;
  departure_date: string;
  arrival_date: string;
  price: number;
  status: string;
  nb_places: number;
  booking_count: number;
}

interface DriverStats {
  totalTrips: number;
  completedTrips: number;
  upcomingTrips: number;
  activeTrips: number;
  ongoingTrips: number;
  totalPassengers: number;
  totalEarnings: number;
  averageRating: number;
  totalDistance?: number;
  // Monthly data
  monthlyTrips: { month: string; trips: number }[];
  monthlyEarnings: { month: string; amount: number }[];
  // Destinations data
  topDestinations: { city: string; count: number }[];
  // Review distribution
  ratings: { rating: number; count: number }[];
  // Vehicle info
  vehicle?: {
    id: number;
    model: string;
    licensePlate: string;
    image: string | null;
  };
}

// Dashboard component
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
        price: parseFloat(trip.price), // Fix: Convert price to number
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

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "";
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "ongoing":
        return "text-blue-600";
      case "completed":
        return "text-indigo-600";
      case "canceled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Pie chart colors
  const RATING_COLORS = ['#22c55e', '#60a5fa', '#facc15', '#f97316', '#ef4444'];
  const DESTINATION_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'];

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
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="shadow-sm">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-full max-w-[120px] mb-2" />
                <Skeleton className="h-10 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-6 text-center max-w-lg">{error}</p>
            <Button onClick={handleRetry}>
              <RefreshCw className="h-4 w-4 mr-2" /> Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <Card className="shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-16 w-16 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Driver Data Unavailable</h2>
            <p className="text-gray-600 mb-6 text-center">We couldn't retrieve your driver information. Please make sure you're registered as a driver.</p>
            <Button onClick={() => router.push("/become-driver")}>
              Become a Driver
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Driver Dashboard</h1>
        <p className="text-gray-500">
          Welcome back. Here's your performance overview.
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Trips</p>
                <h3 className="text-3xl font-bold mt-1">{stats.totalTrips}</h3>
              </div>
              <div className="bg-indigo-100 p-2 rounded-full">
                <Route className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-600 font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                {Math.floor((stats.completedTrips / (stats.totalTrips || 1)) * 100)}%
              </span>
              <span className="text-gray-500 ml-2">completion rate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                <h3 className="text-3xl font-bold mt-1">${stats.totalEarnings.toFixed(2)}</h3>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-gray-500">
                Avg. ${((stats.totalEarnings || 0) / (stats.totalTrips || 1)).toFixed(2)} per trip
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Passengers</p>
                <h3 className="text-3xl font-bold mt-1">{stats.totalPassengers}</h3>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-gray-500">
                Avg. {((stats.totalPassengers || 0) / (stats.totalTrips || 1)).toFixed(1)} per trip
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Rating</p>
                <h3 className="text-3xl font-bold mt-1">{stats.averageRating.toFixed(1)}</h3>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(stats.averageRating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 ml-2">
                from {stats.ratings.reduce((sum, item) => sum + item.count, 0)} reviews
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Performance Stats */}
      <div className="mb-8">
        <Tabs defaultValue="trips" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="trips">Trip Analytics</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="trips">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Destinations</CardTitle>
                  <CardDescription>Most frequent destinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.topDestinations}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }: { name: string; percent: number }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="city"
                        >
                          {stats.topDestinations.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={DESTINATION_COLORS[index % DESTINATION_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Monthly Trips</CardTitle>
                  <CardDescription>Number of trips per month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.monthlyTrips}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="trips" fill="#8884d8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vehicle Information */}
            {stats.vehicle && (
              <Card className="shadow-sm bg-white mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Vehicle Information</CardTitle>
                  <CardDescription>Details of your registered vehicle</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-full md:w-1/3 bg-gray-100 rounded-lg overflow-hidden">
                      {stats.vehicle.image ? (
                        <img
                          src={"http:/localhost:8000/"+stats.vehicle.image}
                          alt={stats.vehicle.model}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                          <CarFront className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="text-xl font-semibold mb-4">{stats.vehicle.model}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">License Plate</p>
                          <p className="text-lg font-medium">{stats.vehicle.licensePlate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Vehicle ID</p>
                          <p className="text-lg font-medium">{stats.vehicle.id}</p>
                        </div>
                        {stats.totalDistance !== undefined && (
                          <div>
                            <p className="text-sm font-medium text-gray-500">Total Distance</p>
                            <p className="text-lg font-medium">{stats.totalDistance.toFixed(0)} km</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="earnings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Monthly Earnings</CardTitle>
                  <CardDescription>Your earnings trend over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stats.monthlyEarnings}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis 
                          tickFormatter={(value: number) => `$${value}`}
                        />
                        <Tooltip 
                          formatter={(value:number) => [`$${Number(value).toFixed(2)}`, "Earnings"]} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#22c55e" 
                          strokeWidth={2}
                          dot={{ r: 4, fill: "#22c55e" }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Earnings Breakdown</CardTitle>
                  <CardDescription>Performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Completed Trips</span>
                        <span className="text-sm font-medium">{stats.completedTrips} of {stats.totalTrips}</span>
                      </div>
                      <Progress 
                        value={(stats.completedTrips / (stats.totalTrips || 1)) * 100} 
                        className="h-2 bg-gray-200"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Average Per Trip</span>
                        <span className="text-sm font-medium">
                          ${((stats.totalEarnings || 0) / (stats.completedTrips || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Average Per Passenger</span>
                        <span className="text-sm font-medium">
                          ${((stats.totalEarnings || 0) / (stats.totalPassengers || 1)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium mb-3">Earnings by Status</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm flex items-center">
                            <span className="w-3 h-3 inline-block bg-green-500 rounded-full mr-2"></span>
                            Completed
                          </span>
                          <span className="text-sm font-medium">
                            ${(stats.totalEarnings * 0.9).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm flex items-center">
                            <span className="w-3 h-3 inline-block bg-blue-500 rounded-full mr-2"></span>
                            Active
                          </span>
                          <span className="text-sm font-medium">
                            ${(stats.totalEarnings * 0.1).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Rating Distribution</CardTitle>
                  <CardDescription>Breakdown of your ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.ratings}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }: { name: string; percent: number }) => `${name} stars (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="rating"
                        >
                          {stats.ratings.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={RATING_COLORS[index % RATING_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  <CardDescription>Key indicators of your service quality</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Rating</span>
                        <span className="text-sm font-medium">{stats.averageRating.toFixed(1)} / 5.0</span>
                      </div>
                      <Progress 
                        value={(stats.averageRating / 5) * 100} 
                        className="h-2 bg-gray-200"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Trip Completion Rate</span>
                        <span className="text-sm font-medium">
                          {Math.floor((stats.completedTrips / (stats.totalTrips || 1)) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(stats.completedTrips / (stats.totalTrips || 1)) * 100} 
                        className="h-2 bg-gray-200"
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium mb-3">Rating Breakdown</h4>
                      <div className="space-y-2">
                        {stats.ratings.map((rating) => (
                          <div key={rating.rating} className="flex items-center">
                            <span className="text-sm font-medium w-14">{rating.rating} stars</span>
                            <div className="mx-2 flex-1">
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-500"
                                  style={{ 
                                    width: `${(rating.count / stats.ratings.reduce((sum, item) => sum + item.count, 0)) * 100}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium w-10 text-right">{rating.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recent Trips */}
      <div className="mb-8">
        <Card className="shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Recent Trips</CardTitle>
            <CardDescription>Your most recent trip activities</CardDescription>
          </CardHeader>
          <CardContent>
            {recentTrips.length > 0 ? (
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div key={trip.id} className="p-4 border rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center mb-2 md:mb-0">
                        <div className="mr-4 p-3 bg-indigo-100 rounded-full">
                          <MapPin className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{trip.departure} → {trip.arrival}</h4>
                          <p className="text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDate(trip.departure_date)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-lg font-medium">${trip.price.toFixed(2)}</p>
                          <p className={`text-sm flex items-center ${getStatusColor(trip.status)}`}>
                            <span className="h-2 w-2 rounded-full bg-current mr-1"></span>
                            {trip.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <Clock className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {formatTime(trip.departure_date)} - {formatTime(trip.arrival_date)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {trip.booking_count}/{trip.nb_places} seats booked
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Route className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No recent trips</h3>
                <p className="text-gray-500 mb-4">You haven't created any trips yet.</p>
                <Button onClick={() => router.push("/create-trip")}>
                  Create Your First Trip
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t">
            <Button 
              variant="outline"
              className="mt-2" 
              onClick={() => router.push("/my-trips")}
            >
              View All Trips
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Trip Status Overview */}
      <div>
        <Card className="shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Trip Status Overview</CardTitle>
            <CardDescription>Summary of your trip statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Upcoming</p>
                    <h4 className="text-xl font-bold">{stats.upcomingTrips}</h4>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <Route className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Active</p>
                    <h4 className="text-xl font-bold">{stats.activeTrips}</h4>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <CarFront className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ongoing</p>
                    <h4 className="text-xl font-bold">{stats.ongoingTrips}</h4>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-full mr-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completed</p>
                    <h4 className="text-xl font-bold">{stats.completedTrips}</h4>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <LayoutDashboard className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm font-medium">Trip Completion Progress</span>
                </div>
                <span className="text-sm font-medium">
                  {Math.floor((stats.completedTrips / (stats.totalTrips || 1)) * 100)}%
                </span>
              </div>
              <Progress 
                value={(stats.completedTrips / (stats.totalTrips || 1)) * 100} 
                className="h-2 bg-gray-200"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={() => router.push("/create-trip")}
            >
              Create New Trip
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}