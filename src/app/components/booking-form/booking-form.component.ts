import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from 'src/app/shared/models/room';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  room: Room;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    const navigation = this.router.getCurrentNavigation();
    this.room = navigation?.extras.state?.['room'];

    this.bookingForm = this.fb.group({
      roomId: [this.room.id, Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      rooms: ['', Validators.required],
      guests: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.authService.bookRoom(this.bookingForm.value).then(() => {
        console.log('Booking saved successfully');
        this.router.navigate(['/my-bookings']);
      }).catch((error) => {
        console.error('Error saving booking:', error);
      });
    }
  }
}