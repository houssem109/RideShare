import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDownUp } from "lucide-react";

interface SortOrderButtonProps {
  sortOrder: "asc" | "desc";
  onToggle: () => void;
}

export const SortOrderButton: React.FC<SortOrderButtonProps> = ({ 
  sortOrder, 
  onToggle 
}) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onToggle} 
      className="flex items-center gap-1"
    >
      <ArrowDownUp className="h-4 w-4" />
      {sortOrder === "desc" ? "Newest first" : "Oldest first"}
    </Button>
  );
};