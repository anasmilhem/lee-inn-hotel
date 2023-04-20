import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
  providers: [DatePipe]
})
export class MyBookingsComponent {

  bookings$: Observable<any[]>;

  constructor(private authService: AuthService) {
    this.bookings$ = of([]);
  }

  ngOnInit(): void {
    this.bookings$ = this.authService.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.authService.getMyBookings();
        } else {
          return of([]);
        }
      })
    );

    // Subscribe to bookings$ and log the bookings
    this.bookings$.subscribe((bookings) => {
      console.log('Bookings:', bookings);
    });
  }
}


