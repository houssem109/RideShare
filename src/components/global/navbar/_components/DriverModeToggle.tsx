"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car, UserCircle, ArrowLeftRight } from "lucide-react";

interface DriverModeToggleProps {
  isDriver: boolean;
  clientMode: boolean;
  setClientMode: (isClientMode: boolean) => void;
}

export function DriverModeToggle({ isDriver, clientMode, setClientMode }: DriverModeToggleProps) {
  const pathname = usePathname();
  
  // Toggle mode without changing pages
  const switchToClientMode = () => {
    setClientMode(true);
  };
  
  const switchToDriverMode = () => {
    setClientMode(false);
  };
  
  // If user is not a driver
  if (!isDriver) {
    return (
      <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
        <a href="/become-driver" className="flex items-center">
          <Car className="mr-2 h-4 w-4" />
          <span>Become a Driver</span>
        </a>
      </Button>
    );
  }

  // If in client mode
  if (clientMode) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Client Mode</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={switchToDriverMode}>
            <div className="flex items-center">
              <Car className="mr-2 h-4 w-4" />
              <span>Switch to Driver Mode</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // If in driver mode
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          <Car className="mr-2 h-4 w-4" />
          <span>Driver Mode</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={switchToClientMode}>
          <div className="flex items-center">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Switch to Client Mode</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}