"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import ActivityTracker from "./components/ActivityTracker";
import CTA from "./components/CTA";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";



export default function Page(): React.ReactNode {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState<boolean>(false);

  // This useEffect ensures hydration is complete before showing animations
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <Hero mounted={mounted} />

      {/* Features Section */}
      <Features />

      {/* Track Audience Activities Section */}
      <ActivityTracker />

      {/* How It Works Section */}
      <HowItWorks />

      {/* CTA Section */}
      <CTA />
    </div>
  );
}