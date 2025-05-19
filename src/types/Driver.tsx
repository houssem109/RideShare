export interface DriverTrip {
  id: number;
  name: string;
  phonenumber: string;
  price: string;
  departure: string;
  arrival: string;
  departure_date: string;
  arrival_date: string;
  nb_places: number;
  status: string;
  voiture: number;
  owner_id: number;
  created_at: string;
  voiture_details: {
    car_image_id: string;
    id_voiture: number;
    image: string;
    marque: string;
    matricule: string;
  };
  booking_count?: number;
  available_seats?: number;
}

export interface Passenger {
  id: number;
  name: string;
  phonenumber: string;
  status: "pending" | "confirmed" | "rejected";
}