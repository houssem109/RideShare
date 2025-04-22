"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, LogIn, UserPlus, Car, Home } from "lucide-react";
import { signOutAction } from "@/app/actions";

// Define the type for the props
interface UserDropdownProps {
  user: {
    email?: string | null;
    user_metadata?: any;
    [key: string]: any;
  } | null;
  isDriver: boolean;
  currentPath?: string;
}

export function UserDropdown({ user, isDriver, currentPath = '' }: UserDropdownProps) {
  const isClientDashboard = currentPath.includes('/espace-client');
  const isDriverDashboard = currentPath.includes('/espace-driver');
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <User className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {user ? (
          <>
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            
            {/* Show Client Dashboard link - highlight if current page */}
            <DropdownMenuItem asChild className={isClientDashboard ? 'bg-muted' : ''}>
              <Link href="/espace-client" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                <span>Client Dashboard</span>
              </Link>
            </DropdownMenuItem>
            
            {/* Show Driver Dashboard link if user is a driver - highlight if current page */}
            {isDriver && (
              <DropdownMenuItem asChild className={isDriverDashboard ? 'bg-muted' : ''}>
                <Link href="/espace-driver" className="flex items-center">
                  <Car className="mr-2 h-4 w-4" />
                  <span>Driver Dashboard</span>
                </Link>
              </DropdownMenuItem>
            )}
            
            {/* Show Become a Driver link if user is not a driver */}
            {!isDriver && (
              <DropdownMenuItem asChild>
                <Link href="/become-driver" className="flex items-center">
                  <Car className="mr-2 h-4 w-4" />
                  <span>Become a Driver</span>
                </Link>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator />
            <form action={signOutAction}>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <button className="w-full flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </form>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/sign-in" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sign-up" className="flex items-center">
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}