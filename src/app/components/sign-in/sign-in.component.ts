import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports:
    [CommonModule,
      ReactiveFormsModule,
      RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const { userName, userPassword } = this.loginForm.value;
    this.authService.SignIn(userName, userPassword);
  }

  googleSignIn(): void {
    this.authService.GoogleAuth();
  }

}
