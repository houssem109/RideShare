import React from 'react';
import { User, Phone, Mail, Globe, UserCircle } from 'lucide-react';
import { UserProfile, getDisplayName } from '@/types/UserProfile';

interface PersonalInformationProps {
  profile: UserProfile;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ profile }) => {
  return (
    <div className="rounded-xl overflow-hidden bg-white shadow-lg">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Personal Information</h2>
      </div>
      
      <div className="p-5 space-y-6">
        {/* Show user info fields only if they exist */}
        {(profile.first_name || profile.last_name || profile.full_name) && (
          <InfoItem 
            icon={<User className="w-5 h-5 text-indigo-600" />} 
            label="Full Name" 
            value={getDisplayName(profile)} 
          />
        )}
        
        {profile.email && (
          <InfoItem 
            icon={<Mail className="w-5 h-5 text-indigo-600" />} 
            label="Email" 
            value={profile.email} 
          />
        )}
        
        {profile.phone && (
          <InfoItem 
            icon={<Phone className="w-5 h-5 text-indigo-600" />} 
            label="Phone" 
            value={profile.phone} 
          />
        )}
        
        {profile.cin && (
          <InfoItem 
            icon={<UserCircle className="w-5 h-5 text-indigo-600" />} 
            label="CIN" 
            value={profile.cin} 
          />
        )}
        
        {profile.website && (
          <InfoItem 
            icon={<Globe className="w-5 h-5 text-indigo-600" />} 
            label="Website" 
            value={profile.website} 
            isLink={true}
          />
        )}
      </div>
    </div>
  );
};

// Sub-component for each information item
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, isLink = false }) => {
  return (
    <div className="flex items-start">
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4 mt-1">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        {isLink ? (
          <a 
            href={value.startsWith('http') ? value : `https://${value}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="font-medium text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;