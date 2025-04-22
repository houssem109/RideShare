import RightArrow from "@/components/svg/RightArrow"
import UserIcon from "@/components/svg/UserIcon";

// App preview component
export default function AppPreview() {
    const users=[{
        fullname:"Rahma Bh.",
        time:"8:30 AM",
        price:"5.50",}
        ,{
        fullname:"Nour B.",
        time:"9:00 AM",
        price:"4.75",}
        ,{
        fullname:"Houssem Bj.",
        time:"10:00 AM",
        price:"6.00",}
        ,{
        fullname:"Eya D.",
        time:"10:30 AM",
        price:"5.25",}
    ]
    return (
      <>
        <div className="absolute w-full h-full rounded-3xl overflow-hidden shadow-xl transform -rotate-3 scale-95 -translate-x-6 translate-y-2 bg-gray-100 dark:bg-gray-800"></div>
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
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">From</div>
                  <div className="text-sm font-medium">To</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="bg-white dark:bg-gray-700 p-2 rounded w-5/12 text-xs">
                    Downtown
                  </div>
                  <RightArrow/>
                  <div className="bg-white dark:bg-gray-700 p-2 rounded w-5/12 text-xs">
                    Tech Park
                  </div>
                </div>
              </div>
  
              <div className="mb-4">
                <div className="font-medium mb-2">
                  Available Rides
                </div>
                <div className="space-y-3">
                {users.map((user, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center mr-2">
                          <UserIcon className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-xs font-medium">
                            {user.fullname}
                          </div>
                          <div className="text-xs">
                            {user.time} • {user.price} TN
                          </div>
                        </div>
                      </div>
                      <button className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                        Book
                      </button>
                    </div>
                  </div>
                ))}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }