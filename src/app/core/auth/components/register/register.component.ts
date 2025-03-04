import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  isLoading: boolean = false;
  responseMessage: string = '';
  registerFrom!: FormGroup;
  formInit() {
    this.registerFrom = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
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
        rePassword: [null, [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        gender: ['male', [Validators.required]],
      },
      { validators: this.mismatch }
    );
  }
  mismatch(control: AbstractControl) {
    return control.get('password')?.value === control.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }
  register(data: any): void {
    this.isLoading = true;
    this.authService.register(data).subscribe({
      next: ({ message }) => {
        this.responseMessage = message;
        this.isLoading = false;
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 500);
      },
      error: ({ message }) => {
        this.responseMessage = message;
        this.isLoading = false;
      },
    });
  }
  submitForm() {
    if (this.registerFrom.valid) {
      this.register(this.registerFrom.value);
    } else {
      this.registerFrom.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    this.formInit();
  }
}
