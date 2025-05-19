export interface TrajetDetail {
  id: number;
  name: string;
  phonenumber: string;
  price: number;
  departure: string;
  arrival: string;
  departure_date: string;
  arrival_date: string;
  nb_places: number;
  created_at: string;
  status: "active" | "inactive" | "completed";
  car_details: {
    id: number;
    marque: string;
    matricule: string;
    image: string | null;
    car_image_id: string | null;
  } | null;
  owner_details: {
    id: number;
    user_id: string;
    car: {
      id: number;
      marque: string;
      matricule: string;
      image: string | null;
      car_image_id: string | null;
    } | null;
  } | null;
}