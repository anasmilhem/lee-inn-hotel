import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RoomService } from 'src/app/shared/services/room.service';
import { Room } from 'src/app/shared/models/room';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private roomService: RoomService) {
    this.searchForm = this.fb.group({
      checkIn: [''],
      checkOut: [''],
      rooms: [''],
      guests: ['']
    });
  }

  onSubmit() {
    // Navigate to the room search results page and pass the form data as query params
    this.router.navigate(['/room-search'], { queryParams: this.searchForm.value });
  }

}
