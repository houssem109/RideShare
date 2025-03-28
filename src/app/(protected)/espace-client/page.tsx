
import { createClient } from "@/utils/supabase/server";
import React from "react";
export default async function EspaceClientPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-6">
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Welcome to your client dashboard. Here you can book rides and manage
          your trips.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="border rounded-lg p-4 bg-blue-50">
            <h3 className="font-medium text-lg mb-2">Account Info</h3>
            <p className="text-sm text-gray-600">Email: {user?.email}</p>
          </div>

          <div className="border rounded-lg p-4 bg-purple-50">
            <h3 className="font-medium text-lg mb-2">Book a Ride</h3>
            <p className="text-sm text-gray-600">
              Click here to book a new ride.
            </p>
          </div>

          <div className="border rounded-lg p-4 bg-green-50">
            <h3 className="font-medium text-lg mb-2">Trip History</h3>
            <p className="text-sm text-gray-600">You have no recent trips.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
