import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Booking } from '../models/booking';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  async createBooking(booking: Booking) {
    const bookingCollection = this.afs.collection<Booking>('bookings');
    booking.createdAt = new Date();
    await bookingCollection.add(booking);
  }

  getUserBookings(userId: string) {
    return this.afs
      .collection<Booking>('bookings', (ref) => ref.where('userId', '==', userId))
      .valueChanges({ idField: 'id' });
  }
}
