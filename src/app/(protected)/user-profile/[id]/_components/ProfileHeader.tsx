import React from 'react';
import Image from 'next/image';
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserProfile, getProfileImage, getDisplayName, getInitial } from '@/types/UserProfile';

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
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
          {getProfileImage(profile) ? (
            <Image 
              src={getProfileImage(profile)!} 
              alt={`${getDisplayName(profile)}'s profile`}
              className="h-full w-full object-cover" 
              width={128}
              height={128}
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-indigo-600 text-5xl font-bold">
              {getInitial(profile)}
            </div>
          )}
        </div>
        
        {/* User Info */}
        <div className="pt-20 text-center">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold">{getDisplayName(profile)}</h1>
            {profile.role === 'admin' && (
              <Badge className="ml-2 bg-blue-100 text-blue-800 flex items-center gap-1">
                <Shield size={12} />
                Admin
              </Badge>
            )}
          </div>
          
          <p className="text-gray-500 mt-1">
            {profile.username && `@${profile.username}`}
            {profile.updated_at && ` • Updated ${new Date(profile.updated_at).toLocaleDateString()}`}
          </p>
          
          {profile.role && (
            <div className="mt-4">
              <Badge className="bg-indigo-100 text-indigo-800">
                {profile.role}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;