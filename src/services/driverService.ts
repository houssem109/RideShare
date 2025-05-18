// services/driverService.ts
import axios from 'axios';
import { createClient } from '@/utils/supabase/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const getAuthHeader = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  
  if (!data.session?.access_token) {
    throw new Error('No authentication token available');
  }
  
  return {
    Authorization: `Bearer ${data.session.access_token}`
  };
};

export const checkDriverStatus = async (userId: string) => {
  try {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('Unable to fetch user: ' + (userError?.message || 'No user found'));
    }

    if (user.id !== userId) {
      throw new Error('User ID mismatch');
    }

    const currentRole = user.user_metadata?.role;
    console.log('Current user role:', currentRole);

    return { isDriver: currentRole === 'driver', message: currentRole === 'driver' ? 'User is already a driver' : 'User is not a driver' };
  } catch (error) {
    console.error('Error checking driver status:', error);
    throw error;
  }
};

export const registerDriver = async (driverData: FormData) => {
  try {
    const headers = await getAuthHeader();
    console.log('Auth headers for register:', headers);
    
    const response = await axios.post(`${API_URL}/register-driver/`, driverData, {
      headers: {
        ...headers,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error registering driver:', error);
    throw error;
  }
};
// Add this to src/services/driverService.ts

export const updateVehicle = async (vehicleId: number, vehicleData: FormData) => {
  try {
    const headers = await getAuthHeader();
    
    const response = await axios.put(`${API_URL}/voitures/${vehicleId}/`, vehicleData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error updating vehicle:', error);
    throw error;
  }
};