import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.resetPasswordForm = this.formBuilder.group({
      passwordResetEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const { passwordResetEmail } = this.resetPasswordForm.value;
    this.authService.ForgotPassword(passwordResetEmail);
  }
}

