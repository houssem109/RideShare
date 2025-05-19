import React from 'react';

interface StatusFilterTabsProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

const StatusFilterTabs: React.FC<StatusFilterTabsProps> = ({ 
  statusFilter, 
  setStatusFilter 
}) => {
  const tabs = [
    { id: 'all', label: 'All Trips' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="flex mb-6 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 font-medium ${
            statusFilter === tab.id
              ? "text-indigo-600 border-b-2 border-indigo-600"
              : "text-gray-600 hover:text-indigo-600"
          }`}
          onClick={() => setStatusFilter(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilterTabs;