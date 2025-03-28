import Link from 'next/link';
import React from 'react';
import { createClient } from "@/utils/supabase/server";
import { signOutAction } from '@/app/actions';
import { Button } from '@/components/ui/button';

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex   flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold">
                RideShare
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/espace-driver"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Espace Driver
              </Link>
              <Link
                href="/espace-client"
                className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                Espace Client
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              {user && (
                <div className="text-sm text-gray-700">{user.email}</div>
              )}
              <form action={signOutAction}>
                <Button
                  type="submit"
                  variant="outline"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Sign out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}