"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/global/theme-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, LogIn, UserPlus, Menu, X, Car, UserCircle,  } from "lucide-react";
import { signOutAction } from "@/app/actions";
import { createClient } from "@/utils/supabase/client";
import ShieldCheckIcon from "@/components/svg/ShieldCheckIcon";

export function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{email?: string | null, user_metadata?: any} | null>(null);
  const [isDriver, setIsDriver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // Check if the user is authenticated
    const checkUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      
      // Check if user is a driver - replace with your actual logic
      // This is a placeholder - you need to implement how you identify drivers
      // For example, checking a specific field in user_metadata or a separate table
      if (data.user) {
        // Check if user_metadata has a driver flag or check your database
        const isUserDriver = data.user.user_metadata?.is_driver === true;
        setIsDriver(isUserDriver);
      }
      
      setIsLoading(false);
    };
    
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      // Update driver status here too if needed
      if (session?.user) {
        setIsDriver(session.user.user_metadata?.is_driver === true);
      } else {
        setIsDriver(false);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center  w-full ">
          <Link href="/" className="flex items-center ml-16 ">
            <span className="text-xl font-bold">RideShare</span>
             <ShieldCheckIcon className="h-9 w-9" />
       </Link>
          
       <div className="flex-1 flex justify-center">
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
            Features
          </Link>
          <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          
          {/* Driver/Client Toggle Button - Only visible when logged in */}
          {!isLoading && user && (
            isDriver ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <Car className="mr-2 h-4 w-4" />
                    <span>Switch Mode</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/espace-client" className="flex items-center">
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Client Mode</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/espace-driver" className="flex items-center">
                      <Car className="mr-2 h-4 w-4" />
                      <span>Driver Mode</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                <Link href="/become-driver">
                  <Car className="mr-2 h-4 w-4" />
                  <span>Become a Driver</span>
                </Link>
              </Button>
            )
          )}
          
          {/* Authentication Dropdown */}
          {!isLoading && (
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
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/espace-client">Client Dashboard</Link>
                    </DropdownMenuItem>
                    {isDriver && (
                      <DropdownMenuItem asChild>
                        <Link href="/espace-driver">Driver Dashboard</Link>
                      </DropdownMenuItem>
                    )}
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
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-3">
            <Link
              href="/"
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#features"
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#"
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#"
              className="block text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {user ? (
              <div className="pt-2 space-y-3">
                <div className="border-t pt-2">
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
                <Link
                  href="/espace-client"
                  className="block text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Client Dashboard
                </Link>
                {isDriver && (
                  <Link
                    href="/espace-driver"
                    className="block text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Driver Dashboard
                  </Link>
                )}
                {!isDriver && (
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
      )}
    </header>
  );
}