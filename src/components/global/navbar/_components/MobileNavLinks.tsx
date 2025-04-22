"use client";

import Link from "next/link";
import { Car, LogOut, LogIn, UserPlus } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { Dispatch, SetStateAction } from "react";

// Define the type for the props
interface MobileNavLinksProps {
  user: {
    email?: string | null;
    user_metadata?: any;
    [key: string]: any;
  } | null;
  isDriverMode: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  currentPath?: string;
  isLoggedIn: boolean;
}

export function MobileNavLinks({ 
  user, 
  isDriverMode, 
  setIsMenuOpen, 
  currentPath = '',
  isLoggedIn
}: MobileNavLinksProps) {
  return (
    <div className="md:hidden border-t">
      <div className="container py-4 space-y-3">
        {/* Common links for all users */}
        <Link
          href="/"
          className={`block text-sm font-medium transition-colors hover:text-primary ${currentPath === '/' ? 'text-primary' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/trips"
          className={`block text-sm font-medium transition-colors hover:text-primary ${currentPath === '/trips' ? 'text-primary' : ''}`}
          onClick={() => setIsMenuOpen(false)}
        >
          All Trips
        </Link>
        
        {/* Logged-in user specific links */}
        {isLoggedIn && (
          <>
            {/* Driver mode links */}
            {isDriverMode ? (
              <>
                <Link
                  href="/espace-driver"
                  className={`block text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-driver' ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Driver Dashboard
                </Link>
                <Link
                  href="/espace-driver/trips"
                  className={`block text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-driver/trips' ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Trips
                </Link>
                <Link
                  href="/espace-driver/earnings"
                  className={`block text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-driver/earnings' ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Earnings
                </Link>
              </>
            ) : (
              /* Client mode links */
              <>
                <Link
                  href="/espace-client"
                  className={`block text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-client' ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Client Dashboard
                </Link>
                <Link
                  href="/espace-client/bookings"
                  className={`block text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-client/bookings' ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <Link
                  href="/espace-client/profile"
                  className={`block text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-client/profile' ? 'text-primary' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}
          </>
        )}
        
        {user ? (
          <div className="pt-2 space-y-3">
            <div className="border-t pt-2">
              <p className="text-sm font-medium">{user.email}</p>
            </div>
            
            {/* Show "Become a driver" link if not already a driver */}
            {!isDriverMode && user.user_metadata?.role !== "driver" && (
              <Link
                href="/become-driver"
                className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Car className="mr-2 h-4 w-4" />
                <span>Become a Driver</span>
              </Link>
            )}
            
            <form action={signOutAction}>
              <button className="flex items-center text-sm font-medium transition-colors hover:text-primary">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="pt-2 space-y-3 border-t">
            <Link
              href="/sign-in"
              className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Sign Up</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}