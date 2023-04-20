import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Room } from 'src/app/shared/models/room';
import { CommonModule } from '@angular/common';
import { RoomService } from 'src/app/shared/services/room.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookingService } from 'src/app/shared/services/booking.service';
import { Router } from '@angular/router';
import { Booking } from 'src/app/shared/models/booking';
import { take } from 'rxjs';

@Component({
  selector: 'app-room-search',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.scss']
})
export class RoomSearchComponent {
  rooms: Room[] = [];
  currentImageIndex: { [key: string]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router) { }

  // room-search.component.ts
  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;

      // Initialize the currentImageIndex object with the room IDs and set their indexes to 0
      this.rooms.forEach((room) => {
        this.currentImageIndex[room.id] = 0;
      });
    });
  }

  nextImage(roomId: string) {
    if (this.currentImageIndex[roomId] < (this.rooms.find((room) => room.id === roomId)?.images.length ?? 0) - 1) {
      this.currentImageIndex[roomId]++;
    }
  }

  previousImage(roomId: string) {
    if (this.currentImageIndex[roomId] > 0) {
      this.currentImageIndex[roomId]--;
    }
  }

  bookRoom(room: any) {
    this.router.navigate(['/booking-form'], { state: { room: room } });
  }




}
