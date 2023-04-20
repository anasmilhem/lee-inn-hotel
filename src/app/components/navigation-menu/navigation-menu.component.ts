import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  private authSub: Subscription = new Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSub = this.authService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  async signOut(): Promise<void> {
    await this.authService.SignOut();
  }

}
