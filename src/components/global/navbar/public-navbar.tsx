"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/global/theme-switcher";
import { Menu, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import ShieldCheckIcon from "@/components/svg/ShieldCheckIcon";
import { DriverModeToggle } from "./_components/DriverModeToggle";
import { MobileNavLinks } from "./_components/MobileNavLinks";
import { UserDropdown } from "./_components/UserDropdown";
import { MainNavLinks } from "./_components/MainNavLinks";

// Define a type for the user object
type UserType = {
  email?: string | null;
  user_metadata?: {
    role?: string;
    [key: string]: any;
  };
  [key: string]: any; // This allows for other properties that might be in the user object
};

export function PublicNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isDriver, setIsDriver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [clientMode, setClientMode] = useState(true); // State to track current mode

  useEffect(() => {
    const supabase = createClient();
    
    // Check if the user is authenticated
    const checkUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      
      // Check if user is a driver by looking at user_metadata.role
      if (data.user && data.user.user_metadata) {
        const isUserDriver = data.user.user_metadata.role === "driver";
        setIsDriver(isUserDriver);
        
        // If we're on a driver page, set to driver mode
        if (pathname.includes('/espace-driver')) {
          setClientMode(false);
        }
      }
      
      setIsLoading(false);
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user && session.user.user_metadata) {
        setIsDriver(session.user.user_metadata.role === "driver");
      } else {
        setIsDriver(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [pathname]);

  // Function to handle mode switching
  const handleSetClientMode = (isClientMode: boolean) => {
    setClientMode(isClientMode);
  };

  // Determine if we're in driver mode
  const isDriverMode = isDriver && !clientMode;
  
  // Determine if user is logged in
  const isLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center w-full">
          <Link href="/" className="flex items-center ml-16">
            <span className="text-xl font-bold">RideShare</span>
            <ShieldCheckIcon className="h-9 w-9" />
          </Link>
          
          <div className="flex-1 flex justify-center">
            {/* Dynamic Main Navigation Links */}
            <MainNavLinks 
              isDriverMode={isDriverMode} 
              currentPath={pathname}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          
          {/* Mode Toggle Button - Only visible when logged in */}
          {!isLoading && user && (
            <DriverModeToggle 
              isDriver={isDriver}
              clientMode={clientMode}
              setClientMode={handleSetClientMode} 
            />
          )}
          
          {/* Authentication Dropdown */}
          {!isLoading && (
            <UserDropdown 
              user={user} 
              isDriver={isDriver} 
              currentPath={pathname}
            />
          )}
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <MobileNavLinks 
          user={user} 
          isDriverMode={isDriverMode}
          setIsMenuOpen={setIsMenuOpen}
          currentPath={pathname}
          isLoggedIn={isLoggedIn}
        />
      )}
    </header>
  );
}