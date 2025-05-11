// src/services/driverDashboardService.ts
import { apiClient } from "@/lib/axios";

// Get driver trips with various filters
export const getDriverTrips = async (token: string, status?: string) => {
  try {
    const params: Record<string, any> = {};
    if (status) {
      params.status = status;
    }
    
    const response = await apiClient.get("user-trajets/", {
      token,
      params
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching driver trips:", error);
    throw error;
  }
};

// Get driver statistics
export const getDriverStats = async (token: string) => {
  try {
    const response = await apiClient.get("driver-stats/", {
      token
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching driver statistics:", error);
    throw error;
  }
};

// Get driver earnings data
export const getDriverEarnings = async (token: string) => {
  try {
    const response = await apiClient.get("driver-earnings/", {
      token
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching driver earnings:", error);
    throw error;
  }
};

// Get driver vehicle information
export const getDriverVehicle = async (token: string) => {
  try {
    const response = await apiClient.get("voitures/", {
      token
    });
    
    // Since this endpoint might return multiple vehicles, we'll take the first one
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Error fetching vehicle information:", error);
    throw error;
  }
};

// Update driver vehicle information
export const updateDriverVehicle = async (token: string, vehicleId: number, data: FormData) => {
  try {
    const response = await apiClient.put(`voitures/${vehicleId}/`, {
      body: data,
      token
    });
    
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};

// Get driver reservations/bookings for their trips
export const getDriverReservations = async (token: string) => {
  try {
    const response = await apiClient.get("driver-reservations/", {
      token
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching driver reservations:", error);
    throw error;
  }
};