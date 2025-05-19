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
// import { 
//   Tabs, 
//   TabsContent, 
//   TabsList, 
//   TabsTrigger 
// } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  Clock8, 
  XCircle, 
  AlertCircle, 
  ArrowRight,
  RefreshCw,
  ArrowDownUp
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

type Reservation = {
   id: string;
   nom: string;
   prenom: string;
   tel: string;
   status: string;
   payment_method: string;
   payment_status: string | null;
   trajet_depart: string;
   trajet_arrivee: string;
   trajet_date_depart: string;
   trajet_date_arrivee: string;
   
   created_at: string;
};

export default function HistoryPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const router = useRouter();

  useEffect(() => {
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

        const response = await fetch("http://localhost:8000/api/reservations/history/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reservation history");
        }

        const data = await response.json();
        setReservations(data);
        
      } catch (err: any) {
        console.error("Error fetching history:", err);
        setError(err.message || "An error occurred while loading your reservation history");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [router]);

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

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
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

  // Get status badge based on reservation status
  const getStatusBadge = (status: string) => {
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

  // Get payment method icon
  const getPaymentMethodIcon = (method: string) => {
    return method === "cash" ? 
      <Banknote className="h-4 w-4 text-green-600" /> : 
      <CreditCard className="h-4 w-4 text-blue-600" />;
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
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

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "desc" ? "asc" : "desc");
  };

  // Retry loading if there was an error
  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reservation History</h1>
        <p className="text-gray-500 mt-1">
          Track all your past and upcoming trips
        </p>
      </div>

      <Card className="shadow-sm border-0">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Your Reservations</CardTitle>
              <CardDescription>
                Showing {filteredReservations.length} {activeTab !== "all" ? activeTab : ""} reservations
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={toggleSortOrder} className="flex items-center gap-1">
              <ArrowDownUp className="h-4 w-4" />
              {sortOrder === "desc" ? "Newest first" : "Oldest first"}
            </Button>
          </div>
        </CardHeader>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="m-0">
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <Skeleton className="h-4 w-1/3 mb-2" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                      <div className="flex gap-4 mb-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-12 w-full mt-2" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Reservations</h3>
                  <p className="text-gray-500 mb-4">{error}</p>
                  <Button onClick={handleRetry} className="mx-auto">
                    <RefreshCw className="h-4 w-4 mr-2" /> Try Again
                  </Button>
                </div>
              ) : sortedReservations.length === 0 ? (
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
                  <Button onClick={() => router.push("/trajectory")} className="mx-auto">
                    Find Trips
                  </Button>
                </div>
              ) : (
                <div className="space-y-4 mt-2">
                  {sortedReservations.map((reservation) => (
                    <div key={reservation.id} className="border rounded-lg overflow-hidden hover:border-indigo-200 transition-colors">
                      <div className={`
                        p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                        ${reservation.status === "pending" ? "bg-yellow-50" : 
                          reservation.status === "accepted" ? "bg-blue-50" :
                          reservation.status === "completed" ? "bg-green-50" :
                          reservation.status === "rejected" || reservation.status === "cancelled" ? "bg-gray-50" :
                          "bg-white"}
                      `}>
                        {/* Status and Route */}
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getStatusIcon(reservation.status)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1 font-medium text-gray-900">
                              <span>{reservation.trajet_depart}</span>
                              <ArrowRight className="h-3 w-3 text-gray-400" />
                              <span>{reservation.trajet_arrivee}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(reservation.trajet_date_depart)}</span>
                              <Clock className="h-3 w-3 ml-2" />
                              <span>{formatTime(reservation.trajet_date_depart)}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="flex items-center">
                          {getStatusBadge(reservation.status)}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white">
                        <div className="flex flex-col md:flex-row md:justify-between gap-4">
                          {/* Reservation Details */}
                          <div className="space-y-2">
                            <div className="text-sm text-gray-500">Passenger</div>
                            <div className="font-medium">{reservation.prenom} {reservation.nom}</div>
                            <div className="text-sm text-gray-500">{reservation.tel}</div>
                          </div>
                          
                          {/* Payment Info */}
                          <div className="space-y-2">
                            <div className="text-sm text-gray-500">Payment Method</div>
                            <div className="flex items-center gap-2">
                              {getPaymentMethodIcon(reservation.payment_method)}
                              <span className="font-medium">
                                {reservation.payment_method === "cash" ? "Cash" : "Online Payment"}
                              </span>
                            </div>
                            {reservation.payment_status && (
                              <div className="text-sm text-gray-500">
                                Status: {reservation.payment_status}
                              </div>
                            )}
                          </div>
                          
                          {/* Booking Date */}
                          <div className="space-y-2">
                            <div className="text-sm text-gray-500">Booked On</div>
                            <div className="font-medium">
                              {formatDate(reservation.created_at)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatTime(reservation.created_at)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        {(reservation.status === "pending" || reservation.status === "accepted") && (
                          <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                            {reservation.status === "pending" && (
                              <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                                Cancel Reservation
                              </Button>
                            )}
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                              View Details
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}