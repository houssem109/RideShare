import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  onTabChange 
}) => {
  return (
    <div className="px-6">
      <TabsList className="grid grid-cols-4 mb-4 w-full">
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 pb-2"
        >
          All
        </TabsTrigger>
        <TabsTrigger 
          value="upcoming" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 pb-2"
        >
          Upcoming
        </TabsTrigger>
        <TabsTrigger 
          value="completed" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 pb-2"
        >
          Completed
        </TabsTrigger>
        <TabsTrigger 
          value="cancelled" 
          className="data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 pb-2"
        >
          Cancelled
        </TabsTrigger>
      </TabsList>
    </div>
  );
};