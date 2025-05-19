"use client";
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchFiltersProps {
  onSearch: (from: string, to: string) => void;
  isLoading: boolean;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onSearch, 
  isLoading 
}) => {
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");

  const handleSearch = () => {
    onSearch(fromFilter, toFilter);
  };

  return (
    <Card className="mb-8 shadow-lg border-0 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-5">
        <h2 className="text-xl font-bold text-white mb-1">
          Find Your Perfect Ride
        </h2>
        <p className="text-indigo-100 text-sm">
          Enter your departure and destination to find available rides
        </p>
      </div>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-indigo-600" />
              </div>
              <Label htmlFor="from" className="font-medium">
                From
              </Label>
            </div>
            <div className="relative">
              <Input
                id="from"
                className="pl-4 py-6 rounded-xl border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
                placeholder="Enter departure location"
                value={fromFilter}
                onChange={(e) => setFromFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-indigo-600" />
              </div>
              <Label htmlFor="to" className="font-medium">
                To
              </Label>
            </div>
            <div className="relative">
              <Input
                id="to"
                className="pl-4 py-6 rounded-xl border-indigo-100 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 shadow-sm"
                placeholder="Enter destination location"
                value={toFilter}
                onChange={(e) => setToFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl text-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Searching...
              </div>
            ) : (
              "Search Rides"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
