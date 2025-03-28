interface Trajet {
    id: string;
    title: string;
    description: string;
}
type TrajetFormData = {
    zipCode: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    departurePlace: string;
    arrivalPlace: string;
    viecule: viecule;
    price: number;
    seats: number;
    luggage: number;
    departureImage: string;
    arrivalImage: string;
    description: string;
    title: string;
    departureDescription: string;
    arrivalDescription: string;
    departureCoordinates: string;
    arrivalCoordinates: string;
}
