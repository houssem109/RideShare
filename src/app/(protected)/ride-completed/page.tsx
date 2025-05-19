'use client';

import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

export default function Page() {
  // Static user data
  const [isDriver, setIsDriver] = useState(false);
  
  // Static ride status
  const [driverConfirmed, setDriverConfirmed] = useState(false);
  const [passengerConfirmed, setPassengerConfirmed] = useState(false);
  const [rideCompleted, setRideCompleted] = useState(false);
  
  // Locations
  const fromLocation = "Downtown";
  const toLocation = "Tech Park";
  
  // Handle YES button click
  const handleConfirmYes = () => {
    if (isDriver) {
      setDriverConfirmed(true);
    } else {
      setPassengerConfirmed(true);
    }
  };
  
  // Handle NO button click
  const handleConfirmNo = () => {
    if (isDriver) {
      setDriverConfirmed(false);
    } else {
      setPassengerConfirmed(false);
    }
  };
  
  // Toggle between driver and passenger view (for testing)
  const toggleUserType = () => {
    setIsDriver(!isDriver);
  };
  
  // Check if both driver and passenger confirmed
  useEffect(() => {
    if (driverConfirmed && passengerConfirmed) {
      setRideCompleted(true);
    } else {
      setRideCompleted(false);
    }
  }, [driverConfirmed, passengerConfirmed]);
  
  // Reset everything
  const resetDemo = () => {
    setDriverConfirmed(false);
    setPassengerConfirmed(false);
    setRideCompleted(false);
  };
  
  return (
    <main className="min-h-[80vh]  flex flex-col items-center justify-center p-4">
      {/* App Header */}
      <div className="w-full max-w-md bg-white shadow-sm rounded-lg mb-4 p-4 flex items-center">
        <h1 className="text-xl font-bold text-left flex items-center">
          <span className="text-indigo-600">Ride</span>Share
          <span className="ml-1 text-indigo-600">✓</span>
        </h1>
        <div className="ml-auto text-sm text-gray-500">
          Trip ID: #TN38291
        </div>
      </div>
      
      {/* Ride Completion Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="w-full bg-indigo-600 p-4 text-white">
          <h2 className="text-xl font-bold text-center">Ride Completion</h2>
          <p className="text-center text-indigo-100">Confirm your arrival</p>
        </div>
        
        {/* Ride Info */}
        <div className="w-full p-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">From</p>
              <p className="font-medium">{fromLocation}</p>
            </div>
            <div className="text-gray-400">→</div>
            <div>
              <p className="text-sm text-gray-500">To</p>
              <p className="font-medium">{toLocation}</p>
            </div>
          </div>
        </div>
        
        {/* Confirmation Status */}
        <div className="w-full p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">Arrival Status</h3>
          
          <div className="flex justify-between items-center mb-3 p-3 rounded-lg bg-white shadow-sm">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <span className="text-indigo-600 font-medium">D</span>
              </div>
              <span>Driver</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              driverConfirmed 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {driverConfirmed ? "Arrived" : "Pending"}
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 rounded-lg bg-white shadow-sm">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                <span className="text-indigo-600 font-medium">P</span>
              </div>
              <span>Passenger</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              passengerConfirmed 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {passengerConfirmed ? "Arrived" : "Pending"}
            </div>
          </div>
        </div>
        
        {/* User Actions */}
        {rideCompleted ? (
          <div className="w-full p-6 text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center">
                <Check size={32} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-green-600">Ride Completed</h3>
            <p className="text-gray-600 mt-2">
              Thank you for using RideShare!
            </p>
            <button 
              onClick={resetDemo}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="w-full p-6">
            <p className="text-center text-gray-700 mb-4">
              {isDriver 
                ? "Confirm that you have arrived at the destination" 
                : "Has the driver arrived at your destination?"}
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={handleConfirmNo}
                className="flex-1 py-3 border border-red-300 rounded-lg flex items-center justify-center text-red-600 hover:bg-red-50"
              >
                <X size={18} className="mr-2" />
                No
              </button>
              <button 
                onClick={handleConfirmYes}
                className="flex-1 py-3 bg-indigo-600 rounded-lg flex items-center justify-center text-white hover:bg-indigo-700"
              >
                <Check size={18} className="mr-2" />
                Yes
              </button>
            </div>
          </div>
        )}
        
       {/*  {/* Demo Controls 
        <div className="w-full p-4 bg-gray-100 border-t">
          <p className="text-sm text-gray-500 mb-2">Demo Controls (Remove in production)</p>
          <button
            onClick={toggleUserType}
            className="w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-700"
          >
            Switch to {isDriver ? "Passenger" : "Driver"} View
          </button>
        </div> */}
      </div>
    </main>
  );
}