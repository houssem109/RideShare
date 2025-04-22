"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
export default function EditTrip() {
    const router = useRouter();
    const { id } = useParams(); // get ID from URL
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
      name: "",
      phonenumber: "",
      price: "",
      departure: "",
      arrival: "",
      departure_date: "",
      departure_time: "10:00",
      arrival_date: "",
      arrival_time: "14:00",
      nb_places: "",
    });
    useEffect(() => {
        const fetchTrip = async () => {
          const supabase = createClient();
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session?.access_token) {
      console.error("No access token found");
      setError("Authentication required");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/trajet/${id}/`, {
        headers: {
          "Authorization": `Bearer ${sessionData.session.access_token}`,
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized or not found");
      }
          
          
          const data = await res.json();
    
          setFormData({
            name: data.name,
            phonenumber: data.phonenumber,
            price: data.price.toString(),
            departure: data.departure,
            arrival: data.arrival,
            departure_date: data.departure_date.split("T")[0],
            departure_time: data.departure_date.split("T")[1].slice(0, 5),
            arrival_date: data.arrival_date.split("T")[0],
            arrival_time: data.arrival_date.split("T")[1].slice(0, 5),
            nb_places: data.nb_places.toString(),
          });
        } catch (err) {
          console.error("Error fetching trip:", err);
        }
        };
    
        fetchTrip();
      }, [id]);
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
      const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
    
        try {
          const supabase = createClient();
          const { data } = await supabase.auth.getSession();
    
          if (!data.session?.access_token) {
            throw new Error("Authentication required");
          }
    
          const departure_datetime = `${formData.departure_date}T${formData.departure_time}:00Z`;
          const arrival_datetime = `${formData.arrival_date}T${formData.arrival_time}:00Z`;
    
          const apiData = {
            name: formData.name,
            phonenumber: formData.phonenumber,
            price: parseFloat(formData.price),
            departure: formData.departure,
            arrival: formData.arrival,
            departure_date: departure_datetime,
            arrival_date: arrival_datetime,
            nb_places: parseInt(formData.nb_places),
          };
    
          const response = await fetch(`http://localhost:8000/api/trajet/update/${id}/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${data.session.access_token}`,
            },
            body: JSON.stringify(apiData),
          });
    
          if (response.ok) {
            alert("Trip updated successfully!");
            router.push("/espace-driver");
          } else {
            const resData = await response.json();
            setError(resData.error || "Update failed");
          }
        } catch (err: any) {
          setError(err.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };
      return (
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Modifier un trajet</h1>
    
          {error && <p className="text-red-500">{error}</p>}
    
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label>Nom</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>Téléphone</Label>
              <Input name="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
            </div>
            <div>
              <Label>Départ</Label>
              <Input name="departure" value={formData.departure} onChange={handleChange} required />
            </div>
            <div>
              <Label>Arrivée</Label>
              <Input name="arrival" value={formData.arrival} onChange={handleChange} required />
            </div>
            <div>
              <Label>Date de départ</Label>
              <Input type="date" name="departure_date" value={formData.departure_date} onChange={handleChange} required />
            </div>
            <div>
              <Label>Heure de départ</Label>
              <Input type="time" name="departure_time" value={formData.departure_time} onChange={handleChange} required />
            </div>
            <div>
              <Label>Date d’arrivée</Label>
              <Input type="date" name="arrival_date" value={formData.arrival_date} onChange={handleChange} required />
            </div>
            <div>
              <Label>Heure d’arrivée</Label>
              <Input type="time" name="arrival_time" value={formData.arrival_time} onChange={handleChange} required />
            </div>
            <div>
              <Label>Nombre de places</Label>
              <Input type="number" name="nb_places" value={formData.nb_places} onChange={handleChange} required />
            </div>
            <div>
              <Label>Prix</Label>
              <Input type="number" name="price" value={formData.price} onChange={handleChange} required />
            </div>
    
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Mise à jour..." : "Mettre à jour le trajet"}
            </Button>
          </form>
        </div>
      );
    }
                  