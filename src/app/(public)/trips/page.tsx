"use client";
import React, { useState } from 'react';
import { MapPin, Clock, Users, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

const Page = () => {
  // Sample data for trips
  const [trips, setTrips] = useState([
    {
      id: 1,
      driver: 'Rahma Bh.',
      from: 'Downtown',
      to: 'Tech Park',
      time: '8:30 AM',
      price: '5.50',
      seats: 3,
      rating: 4,
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      driver: 'Nour B.',
      from: 'Central Station',
      to: 'University',
      time: '9:00 AM',
      price: '4.75',
      seats: 2,
      rating: 5,
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      driver: 'Houssem Bj.',
      from: 'Mall Plaza',
      to: 'Business District',
      time: '10:00 AM',
      price: '6.00',
      seats: 4,
      rating: 3,
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      driver: 'Eya D.',
      from: 'Residential Area',
      to: 'Airport',
      time: '10:30 AM',
      price: '5.25',
      seats: 1,
      rating: 4,
      image: '/api/placeholder/400/250'
    },
    {
      id: 5,
      driver: 'Ahmed K.',
      from: 'Sports Complex',
      to: 'Shopping Center',
      time: '11:15 AM',
      price: '3.75',
      seats: 3,
      rating: 5,
      image: '/api/placeholder/400/250'
    },
    {
      id: 6,
      driver: 'Sarra M.',
      from: 'Beach Road',
      to: 'City Center',
      time: '12:00 PM',
      price: '4.50',
      seats: 2,
      rating: 4,
      image: '/api/placeholder/400/250'
    }
  ]);

  const [fromFilter, setFromFilter] = useState('');
  const [toFilter, setToFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tripsPerPage = 6;

  // Filter trips based on from and to locations
  const filteredTrips = trips.filter(trip => 
    trip.from.toLowerCase().includes(fromFilter.toLowerCase()) && 
    trip.to.toLowerCase().includes(toFilter.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);

  // Function to render stars based on rating
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">All Available Trips</h1>
      
      {/* Search Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Trips</CardTitle>
          <CardDescription>Filter available rides by location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="from"
                  className="pl-10"
                  placeholder="Departure location"
                  value={fromFilter}
                  onChange={(e) => setFromFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="to"
                  className="pl-10"
                  placeholder="Destination location"
                  value={toFilter}
                  onChange={(e) => setToFilter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Trip Grid */}
      {currentTrips.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden">
                <div className="relative">
                  <Image 
                    src={"/opel.jpg"} 
                    alt={`Trip from ${trip.from} to ${trip.to}`} 
                    className="w-full  object-cover"
                    width={400}
                    height={250}
                  />
                 
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {trip.from} → {trip.to}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3" /> {trip.time}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                      {trip.driver.charAt(0)}
                    </div>
                    <span className="font-medium">{trip.driver}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{trip.seats} seats</span>
                    </div>
                    {renderRating(trip.rating)}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="text-lg font-semibold">
                    À Partir {trip.price} DT
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Book</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <p>No matching trips found. Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;