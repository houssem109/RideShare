export interface Trip {
  id: number;
  name: string;
  phonenumber: string;
  price: string;
  departure: string;
  arrival: string;
  departure_date: string;
  arrival_date: string;
  nb_places: number;
  available_seats: number;
  reserved_seats: number;
  status: string;
  voiture: number;
  owner_id: number;
  created_at: string;
  voiture_details?: {
    car_image_id: string;
    id_voiture: number;
    image: string;
    marque: string;
    matricule: string;
  };
}