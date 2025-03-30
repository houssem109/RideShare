"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/global/submit-button";

export default function TrajetForm() {
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    price: "",
    departure: "",
    arrival: "",
    departure_date: "",
    arrival_date: "",
    nb_places: "",
    voiture: "1",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "nb_places" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 🔹 Convertir les dates en format "YYYY-MM-DD"
    const formattedData = {
      ...formData,
      departure_date: formData.departure_date.split("T")[0],
      arrival_date: formData.arrival_date.split("T")[0],
      voiture: 1, // 🚗 Assurer que c'est bien un nombre
    };

    try {
      const response = await fetch("http://localhost:8000/api/trips/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Trajet ajouté avec succès !");
        setFormData({
          name: "",
          phonenumber: "",
          price: "",
          departure: "",
          arrival: "",
          departure_date: "",
          arrival_date: "",
          nb_places: "",
          voiture: "1",
        });
      } else {
        alert(`Erreur : ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Problème de connexion au serveur.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center pb-8">
          <CardTitle className="text-2xl font-bold text-center">Ajouter un Trajet</CardTitle>
          <CardDescription className="text-center">
            Remplissez les informations pour ajouter un trajet.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {/* 🔹 Champs Individuels */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phonenumber">Téléphone</Label>
              <Input type="text" id="phonenumber" name="phonenumber" value={formData.phonenumber} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departure">Départ</Label>
              <Input type="text" id="departure" name="departure" value={formData.departure} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrival">Arrivée</Label>
              <Input type="text" id="arrival" name="arrival" value={formData.arrival} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departure_date">Date de départ</Label>
              <Input type="date" id="departure_date" name="departure_date" value={formData.departure_date} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrival_date">Date d'arrivée</Label>
              <Input type="date" id="arrival_date" name="arrival_date" value={formData.arrival_date} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nb_places">Places disponibles</Label>
              <Input type="number" id="nb_places" name="nb_places" value={formData.nb_places} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix</Label>
              <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
            </div>

            <SubmitButton pendingText="Ajout en cours..." className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Ajouter le Trajet
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}