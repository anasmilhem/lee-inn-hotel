import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, FirebaseUser } from 'src/app/shared/services/auth.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  user: FirebaseUser | null = null;
  private ngUnsubscribe = new ReplaySubject<void>(1);

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user) => (this.user = user));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
