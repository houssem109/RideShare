export interface TripSummary {
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
export interface DriverStats {
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
