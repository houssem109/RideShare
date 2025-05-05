"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Reservation = {
  id: number;
  trajet_name: string;
  departure: string;
  arrival: string;
  departure_date: string;
  arrival_date: string;
  price: string;
  nb_places: number;
  created_at: string;
};

export default function HistoriquePage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReservations = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/sign-in");
        return;
      }

      const accessToken = session.access_token;

      const response = await fetch(
        "http://localhost:8000/api/reservations/history/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch reservation history");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setReservations(data);
      setLoading(false);
    };

    fetchReservations();
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Historique des Réservations</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : reservations.length === 0 ? (
        <p>Aucune réservation trouvée.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((res) => (
            <li key={res.id} className="border p-4 rounded shadow">
              <p><strong>Trajet:</strong> {res.trajet_name}</p>
              <p><strong>De:</strong> {res.departure} → {res.arrival}</p>
              <p><strong>Date départ:</strong> {res.departure_date}</p>
              <p><strong>Date arrivée:</strong> {res.arrival_date}</p>
              <p><strong>Prix:</strong> {res.price} TND</p>
              <p><strong>Places réservées:</strong> {res.nb_places}</p>
              <p className="text-sm text-gray-500">Réservé le {new Date(res.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
