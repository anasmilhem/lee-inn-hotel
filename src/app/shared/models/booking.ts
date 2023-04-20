export interface Booking {
    id?: string;
    roomId: string;
    userId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    rooms: number;
    createdAt: Date;
}