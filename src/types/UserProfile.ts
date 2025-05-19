export interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  phone: string | null;
  cin: string | null;
  profile_photo_url: string | null;
  avatar_url: string | null;
  website: string | null;
  username: string | null;
  updated_at: string | null;
  role: string | null;
}

// Helper functions related to the user profile
export const getDisplayName = (profile: UserProfile): string => {
  if (profile.full_name) return profile.full_name;
  if (profile.first_name && profile.last_name) return `${profile.first_name} ${profile.last_name}`;
  if (profile.first_name) return profile.first_name;
  if (profile.username) return profile.username;
  return 'User';
};

export const getProfileImage = (profile: UserProfile): string | null => {
  return profile.profile_photo_url || profile.avatar_url || null;
};

export const getInitial = (profile: UserProfile): string => {
  const displayName = getDisplayName(profile);
  return displayName.charAt(0).toUpperCase();
};