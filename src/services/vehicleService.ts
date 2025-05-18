import { apiClient } from "@/lib/axios";

// Get driver's vehicle information
export const getDriverVehicle = async (token: string) => {
  try {
    const response = await apiClient.get("voitures/", {
      token
    });
    
    // Since this endpoint returns an array but drivers only have one vehicle,
    // we return the first item
    return response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error("Error fetching vehicle information:", error);
    throw error;
  }
};

// Update driver's vehicle information
export const updateDriverVehicle = async (token: string, formData: FormData) => {
  try {
    // Use fetch directly because apiClient doesn't handle FormData well
    const response = await fetch("http://localhost:8000/api/update-vehicle/", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update vehicle");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};