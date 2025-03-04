import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, ValidationMessagesComponent, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  responseMessage: string = '';
  loginForm!: FormGroup;
  formInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
    });
  }
  login(data: any): void {
    this.isLoading = true;
    this.authService.login(data).subscribe({
      next: (res) => {
        this.responseMessage = res.message;
        this.isLoading = false;
        this.authService.myLocarStorage('setItem', 'token', res.token);
        setTimeout(() => {
          this.router.navigate(['home']);
        }, 500);
      },
      error: ({ message }) => {
        this.responseMessage = message;
        this.isLoading = false;
      },
    });
  }
  submitForm() {
    if (this.loginForm.valid) {
      this.login(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    this.formInit();
  }
}
