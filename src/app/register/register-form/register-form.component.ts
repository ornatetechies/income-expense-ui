import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import {RegisterService} from "./register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  registerForm!: FormGroup;
  regsuccessmsg: string = '';
  submitted = false;
  error: any;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder, private registerService: RegisterService,
  private router: Router
) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.registerForm.get(controlName);
    return (control?.touched && control?.hasError(errorType)) ?? false;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  registerUser(): void {
    if (this.registerForm.invalid) {
      this.error = 'Error in form.';
      return;
    }

    this.registerService.register(this.registerForm.value).subscribe({
      next: (response: string) => {
        console.log('Backend Response:', response);
        if (response === 'Username already taken') {
          this.error = 'The username is already taken.';
        } else if (response === 'User Registered successfully') {
          this.regsuccessmsg = 'Registration successful!';
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to login page
          }, 2000);
        } else {
          this.error = 'Unexpected response from server.';
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.error = 'An error occurred while processing your request.';
      },
    });

  }
  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    const inputField = document.getElementById('confirmPassword') as HTMLInputElement;

    if (this.confirmPasswordVisible) {
      inputField.type = 'text';
    } else {
      inputField.type = 'password';
    }
  }
}
