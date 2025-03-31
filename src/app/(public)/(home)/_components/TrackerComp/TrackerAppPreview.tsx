import React from "react";


export default function TrackerAppPreview() {
  return (
    <div className="absolute w-full h-full rounded-3xl overflow-hidden shadow-2xl">
      <div className="w-full h-full bg-white dark:bg-gray-900 flex flex-col">
        <div className="h-6 bg-gray-100 dark:bg-gray-800 flex items-center px-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
            <div className="font-medium text-sm mb-2">Your Upcoming Rides</div>
            <div className="space-y-3">
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-medium">
                      Downtown → Tech Park
                    </div>
                    <div className="text-xs">Today, 8:30 AM</div>
                  </div>
                  <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">
                    Confirmed
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-medium">
                      Tech Park → Downtown
                    </div>
                    <div className="text-xs">Today, 5:30 PM</div>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded dark:bg-yellow-900 dark:text-yellow-200">
                    Pending
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <div className="font-medium text-sm mb-2">Trip Statistics</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Your Rating
                </div>
                <div className="text-lg font-bold text-yellow-400">
                  4.4<span className="ml-1">★</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Money Saved
                </div>
                <div className="text-lg font-bold text-indigo-600">$128</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
