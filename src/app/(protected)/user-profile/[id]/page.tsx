'use client';

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { UserProfile } from "@/types/UserProfile";
import LoadingSpinner from "./_components/LoadingSpinner";
import PersonalInformation from "./_components/PersonalInformation";
import ProfileHeader from "./_components/ProfileHeader";
import UserNotFound from "./_components/UserNotFound";

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const userId = typeof params.id === 'string' ? params.id : '';
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        
        // Initialize Supabase client
        const supabase = createClient();
        
        // Fetch user from the profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId);
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          setProfile(data[0]);
          console.log('User profile:', data[0]);
        } else {
          setError('User not found');
        }
      } catch (err: any) {
        console.error('Error fetching user profile:', err);
        setError(err.message || 'Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [userId]);
  
  const goBack = () => {
    router.back();
  };
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error || !profile) {
    return <UserNotFound error={error} onGoBack={goBack} />;
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4">
      <div className="max-w-md mx-auto">
        <Button 
          variant="ghost" 
          onClick={goBack} 
          className="mb-4 flex items-center gap-1 hover:bg-white/50 hover:text-indigo-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <ProfileHeader profile={profile} />
        <PersonalInformation profile={profile} />
      </div>
    </main>
  );
}