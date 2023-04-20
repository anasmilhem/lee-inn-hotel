import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { Timestamp } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private firestore: AngularFirestore) { }

  getRooms(): Observable<any> {
    return this.firestore.collection<Room>('hotelRooms').valueChanges({ idField: 'id' });
  }

  searchRooms(checkIn: Date, checkOut: Date, rooms: number, guests: number): Observable<any> {
    // Convert the checkIn and checkOut dates to Firestore timestamps
    const checkInTimestamp = Timestamp.fromDate(checkIn);
    const checkOutTimestamp = Timestamp.fromDate(checkOut);

    // Create a query to search for available rooms based on the search criteria
    const query = this.firestore.collection<Room>('hotelRooms', ref => ref
      .where('availableFrom', '<=', checkInTimestamp)
      .where('availableTo', '>=', checkOutTimestamp)
      .where('maxGuests', '>=', guests)
    );

    return query.valueChanges({ idField: 'id' });
  }
}