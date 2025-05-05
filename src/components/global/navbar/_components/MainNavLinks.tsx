"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavLinksProps {
  isDriverMode: boolean;
  currentPath: string;
  isLoggedIn: boolean;
}

export function MainNavLinks({ isDriverMode, currentPath, isLoggedIn }: MainNavLinksProps) {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {/* Common links for all users */}
      <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === '/' ? 'text-primary' : ''}`}>
        Home
      </Link>
      
      <Link href="/trips" className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === '/trips' ? 'text-primary' : ''}`}>
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
                className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-driver' ? 'text-primary' : ''}`}
              >
                Driver Dashboard
              </Link>
              <Link 
                href="/espace-driver/trips" 
                className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-driver/trips' ? 'text-primary' : ''}`}
              >
                My Trips
              </Link>
              <Link 
                href="/espace-driver/earnings" 
                className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-driver/earnings' ? 'text-primary' : ''}`}
              >
                Earnings
              </Link>
            </>
          ) : (
            /* Client mode links */
            <>
              <Link 
                href="/espace-client" 
                className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-client' ? 'text-primary' : ''}`}
              >
                Client Dashboard
              </Link>
              <Link 
                href="/espace-client/bookings" 
                className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-client/bookings' ? 'text-primary' : ''}`}
              >
                My Bookings
              </Link>
              <Link 
                href="/profile" 
                className={`text-sm font-medium transition-colors hover:text-primary ${currentPath === '/espace-client/profile' ? 'text-primary' : ''}`}
              >
                Profile
              </Link>
            </>
          )}
        </>
      )}
    </nav>
  );
}