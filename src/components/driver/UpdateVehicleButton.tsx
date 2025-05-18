"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

// Component to add to the vehicle card in espace-driver dashboard
export function UpdateVehicleButton() {
  return (
    <Button asChild className="mt-4" variant="outline">
      <Link href="/espace-driver/update-vehicle" className="flex items-center gap-2">
        <PenLine className="h-4 w-4" />
        Update Vehicle Information
      </Link>
    </Button>
  );
}