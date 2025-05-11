"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type Reservation = {
  id: string;
  nom: string;
  prenom: string;
  tel: string;
  status: string;
  payment_method: string;
  payment_status: string;
  trajet_ville_depart: string;
  trajet_ville_arrivee: string;
  trajet_date: string;
  created_at: string;
};

export default function HistoriquePage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReservations = async () => {
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
              <p><strong>Nom:</strong> {res.nom} {res.prenom}</p>
              <p><strong>Téléphone:</strong> {res.tel}</p>
              <p><strong>Trajet:</strong> {res.trajet_ville_depart} → {res.trajet_ville_arrivee}</p>
              <p><strong>Date de départ:</strong> {new Date(res.trajet_date).toLocaleString()}</p>
              <p><strong>Statut:</strong> {res.status}</p>
              <p><strong>Méthode de paiement:</strong> {res.payment_method}</p>
              <p><strong>Statut du paiement:</strong> {res.payment_status}</p>
              <p className="text-sm text-gray-500">
                Réservé le {new Date(res.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

