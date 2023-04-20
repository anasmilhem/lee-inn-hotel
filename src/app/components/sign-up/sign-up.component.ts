import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPwd: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const { userEmail, userPwd, firstName, lastName } = this.signUpForm.value;
    this.authService.SignUp(userEmail, userPwd, firstName, lastName);
  }

  googleSignUp(): void {
    this.authService.GoogleAuth();
  }

}
