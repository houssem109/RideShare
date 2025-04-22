import CostSharingIcon from "@/components/svg/CostSharingIcon";
import EnvironmentalImpactIcon from "@/components/svg/EnvironmentalImpactIcon";
import FlexibleSchedulingIcon from "@/components/svg/FlexibleSchedulingIcon";
import LocationIcon from "@/components/svg/LocationIcon";
import UsersGroup from "@/components/svg/UsersGroup";
import { VerifiedIcon } from "lucide-react";
import { ReactNode } from "react";

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}

// Default feature data
export const FeaturesData: FeatureItem[] = [
  {
    id: 1,
    title: "Real-time Ride Matching",
    description: "Our intelligent algorithm connects you with drivers or passengers going your way in real-time.",
    icon: <LocationIcon />,
  },
  {
    id: 2,
    title: "Verified Users",
    description: "All users are verified through ratings, and reviews for a safe experience.",
    icon: <VerifiedIcon />,
  },
  {
    id: 3,
    title: "Cost Sharing",
    description: "Easily split fuel costs and tolls, with transparent pricing and secure in-app payments.",
    icon: <CostSharingIcon />,
  },
  {
    id: 4,
    title: "Flexible Scheduling",
    description: "Find rides for one-time trips or set up recurring carpools for your daily commute.",
    icon: <FlexibleSchedulingIcon />,
  },
  {
    id: 5,
    title: "Environmental Impact",
    description: "Track your carbon footprint reduction and see how your carpooling helps the environment.",
    icon: <EnvironmentalImpactIcon />,
  },
  {
    id: 6,
    title: "Community Building",
    description: "Connect with like-minded people in your area and build a trusted network of carpoolers.",
    icon: <UsersGroup className="h-8 w-8 text-indigo-600" />,
  },
  
 
];