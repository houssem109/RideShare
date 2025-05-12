'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  User, 
  Phone, 
  MapPin, 
  Mail, 
  Calendar, 
  ArrowLeft,
  Star,
  Shield,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// User interfaces
interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  profileImage: string;
  rating: number;
  ridesCompleted: number;
  memberSince: string;
  verified: boolean;
}

// Static user data - replace with API call in production
const getUserProfile = (id: string): UserProfile => {
  // Mock user data - replace with API call in production
  const users: Record<string, UserProfile> = {
    "1": {
      id: 1,
      fullName: "Ahmed Ben Salem",
      email: "ahmed.bensalem@gmail.com",
      phone: "+216 98765432",
      dateOfBirth: "1990-05-15",
      address: "123 Habib Bourguiba Ave, Tunis",
      profileImage: "/images/profiles/ahmed.jpg", // Replace with actual path
      rating: 4.8,
      ridesCompleted: 42,
      memberSince: "January 2023",
      verified: true
    },
    "2": {
      id: 2,
      fullName: "Mouna Trabelsi",
      email: "mouna.trabelsi@outlook.com",
      phone: "+216 55123456",
      dateOfBirth: "1995-08-22",
      address: "75 Libya Street, Ariana",
      profileImage: "/images/profiles/mouna.jpg",
      rating: 4.6,
      ridesCompleted: 18,
      memberSince: "March 2023",
      verified: true
    },
    "3": {
      id: 3,
      fullName: "Karim Mahjoub",
      email: "karim.m@yahoo.com",
      phone: "+216 27891234",
      dateOfBirth: "1988-11-10",
      address: "42 Mohamed V Avenue, Ben Arous",
      profileImage: "/images/profiles/karim.jpg",
      rating: 4.9,
      ridesCompleted: 56,
      memberSince: "November 2022",
      verified: true
    },
    "4": {
      id: 4,
      fullName: "Sarra Belhadj",
      email: "sarra.b89@gmail.com",
      phone: "+216 92345678",
      dateOfBirth: "1989-03-30",
      address: "12 Carthage Street, Marsa",
      profileImage: "/images/profiles/sarra.jpg",
      rating: 4.7,
      ridesCompleted: 24,
      memberSince: "May 2023",
      verified: false
    },
    "5": {
      id: 5,
      fullName: "Youssef Bouazizi",
      email: "youssef.bouazizi@gmail.com",
      phone: "+216 53987654", 
      dateOfBirth: "1992-07-14",
      address: "89 Independence Ave, Manouba",
      profileImage: "/images/profiles/youssef.jpg",
      rating: 4.5,
      ridesCompleted: 35,
      memberSince: "February 2023",
      verified: true
    },
    "6": {
      id: 6,
      fullName: "Amina Mejri",
      email: "amina.mejri@hotmail.com",
      phone: "+216 24567890",
      dateOfBirth: "1997-12-05",
      address: "27 Habib Thameur Street, Sousse",
      profileImage: "/images/profiles/amina.jpg",
      rating: 4.4,
      ridesCompleted: 12,
      memberSince: "June 2023",
      verified: false
    }
  };
  
  // Return the user with the matching ID or a default profile
  return users[id] || {
    id: parseInt(id),
    fullName: "User Not Found",
    email: "N/A",
    phone: "N/A",
    dateOfBirth: "N/A",
    address: "N/A",
    profileImage: "/images/default-avatar.png",
    rating: 0,
    ridesCompleted: 0,
    memberSince: "N/A",
    verified: false
  };
};

// Format date to display in a readable format
const formatDate = (dateString: string) => {
  if (dateString === "N/A") return "N/A";
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const userId = typeof params.id === 'string' ? params.id : '';
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (userId) {
      // In a real app, this would be an API call
      const userData = getUserProfile(userId);
      setProfile(userData);
      setLoading(false);
    }
  }, [userId]);
  
  const goBack = () => {
    router.back();
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">The user profile you are looking for does not exist or has been removed.</p>
          <Button onClick={goBack}>Go Back</Button>
        </div>
      </div>
    );
  }
  
  // Calculate age from date of birth
  const calculateAge = (birthDate: string): number => {
    if (birthDate === "N/A") return 0;
    
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };
  
  // Generate star rating display
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        <span className="text-xl font-semibold mr-2">{rating.toFixed(1)}</span>
        <div className="flex text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-lg">
              {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "⯨" : "☆"}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={goBack} 
          className="mb-4 flex items-center gap-1 hover:bg-white/50 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        {/* Profile Header Card */}
        <div className="rounded-xl overflow-hidden bg-white shadow-lg mb-6">
          {/* Cover Photo */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-36 relative">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-20" 
                 style={{
                   backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                   backgroundSize: '20px 20px'
                 }}>
            </div>
          </div>
          
          <div className="px-6 pt-0 pb-6 relative">
            {/* Profile Avatar */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-md">
              {/* Use a placeholder image if no profile image is available */}
              <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-indigo-600 text-5xl font-bold">
                {profile.fullName.charAt(0)}
              </div>
            </div>
            
            {/* User Info */}
            <div className="pt-20 text-center">
              <div className="flex items-center justify-center">
                <h1 className="text-2xl font-bold">{profile.fullName}</h1>
                {profile.verified && (
                  <Badge className="ml-2 bg-blue-100 text-blue-800 flex items-center gap-1">
                    <Shield size={12} />
                    Verified
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-500 mt-1">
                {calculateAge(profile.dateOfBirth)} years old • Member since {profile.memberSince}
              </p>
              
              <div className="flex items-center justify-center mt-4 space-x-6">
              {/*   <div className="flex flex-col items-center">
                  <div className="flex items-center text-yellow-500 mb-1">
                    <Star size={16} className="mr-1 fill-yellow-500" />
                    <span className="font-bold">{profile.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                
                <div className="w-px h-10 bg-gray-200"></div> */}
                
                <div className="flex flex-col items-center">
                  <div className="flex items-center text-indigo-600 mb-1">
                    <Award size={16} className="mr-1" />
                    <span className="font-bold">{profile.ridesCompleted}</span>
                  </div>
                  <p className="text-xs text-gray-500">Rides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Personal Information Card */}
        <div className="rounded-xl overflow-hidden bg-white shadow-lg">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Personal Information</h2>
          </div>
          
          <div className="p-5 space-y-6">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">{profile.fullName}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                <Mail className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{profile.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                <Phone className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">{profile.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                <Calendar className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-900">{formatDate(profile.dateOfBirth)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
                <MapPin className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">{profile.address}</p>
              </div>
            </div>
          </div>
          
        {/*   {/* Optional Contact Button *
          <div className="p-5 bg-gray-50 border-t">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
              <Phone className="w-4 h-4 mr-2" />
              Contact {profile.fullName.split(' ')[0]}
            </Button>
          </div> */}
        </div>
      </div>
    </main>
  );
}