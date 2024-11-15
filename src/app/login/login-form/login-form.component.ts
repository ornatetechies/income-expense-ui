import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  loginSuccessMsg: string = '';
  errorMsg: string = '';
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private  loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.loginService.login(username, password).subscribe({
        next: (response: any) => {
          const token = response.access_token;

          if (token) {
            this.loginService.saveToken(token); // Save token
            this.loginSuccessMsg = 'Login successful!';
            this.errorMsg = '';
            setTimeout(() => this.router.navigate(['/dashboard']), 1000); // Redirect to dashboard
          } else {
            this.errorMsg = 'Login failed. No access token received.';
            this.loginSuccessMsg = '';
          }
        },
        error: (err) => {
          console.error('Error:', err);
          this.errorMsg = 'Invalid username or password. Please try again.';
          this.loginSuccessMsg = '';
        },
      });
    } else {
      this.errorMsg = 'Please fix the errors in the form.';
      this.loginSuccessMsg = '';
    }
  }
}
