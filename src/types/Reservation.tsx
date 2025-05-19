export type Reservation = {
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
  trajet_id: string; // Added this for the view details functionality
  created_at: string;
  etat: string;
};
