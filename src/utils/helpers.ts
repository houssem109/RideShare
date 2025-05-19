import { apiVoiture } from "@/lib/constants";


export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};

export const formatTime = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (error) {
    return "Invalid time";
  }
};
export const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return null;

  // If the image path already includes http, use it as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Remove any leading slash if present
  const cleanPath = imagePath.startsWith("/")
    ? imagePath.substring(1)
    : imagePath;

  // Check if the path already includes 'voitures/'
  if (cleanPath.startsWith("voitures/")) {
    return `${apiVoiture}/${cleanPath}`;
  }

  // Otherwise, assume it's a direct filename in the voitures directory
  return `${apiVoiture}voitures/${cleanPath}`;
};
export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};