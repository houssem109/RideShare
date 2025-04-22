"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import ActivityTracker from "./_components/TrackerComp/ActivityTracker";
import CTA from "./_components/CTA";
import Features from "./_components/Feature/Features";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";




export default function Page(): React.ReactNode {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  // This useEffect ensures hydration is complete before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <Hero mounted={mounted} />

      <Features />

      <ActivityTracker />

      <HowItWorks />

      <CTA />
    </div>
  );
}