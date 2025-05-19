"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavLinksProps {
  isDriverMode: boolean;
  currentPath: string;
  isLoggedIn: boolean;
}

export function MainNavLinks({
  isDriverMode,
  currentPath,
  isLoggedIn,
}: MainNavLinksProps) {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {/* Common links for all users */}
      <Link
        href="/"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          currentPath === "/" ? "text-primary" : ""
        }`}
      >
        Home
      </Link>

      <Link
        href="/available-rides"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          currentPath === "/trajectory" ? "text-primary" : ""
        }`}
      >
        available-rides
      </Link>

      {/* Logged-in user specific links */}
      {isLoggedIn && (
        <>
          {/* Driver mode links */}
          {isDriverMode ? (
            <>
              <Link
                href="/espace-driver"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === "/espace-driver" ? "text-primary" : ""
                }`}
              >
                Driver Dashboard
              </Link>
              <Link
                href="/espace-driver/my-trips"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === "/espace-driver/my-trips" ? "text-primary" : ""
                }`}
              >
                My Trips
              </Link>
              <Link
                href="/espace-driver/reservations-confirmation"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === "/espace-driver/reservations-confirmation"
                    ? "text-primary"
                    : ""
                }`}
              >
                Reservations Confirmation
              </Link>
            </>
          ) : (
            /* Client mode links */
            <>
              <Link
                href="/espace-client/reservation-history"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === "/espace-client/reservation-history"
                    ? "text-primary"
                    : ""
                }`}
              >
                Reservation History{" "}
              </Link>
              
            </>
          )}
        </>
      )}
    </nav>
  );
}
