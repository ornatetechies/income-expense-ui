import { Component } from '@angular/core';
import {LoginService} from "../login/login-form/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to login state
    this.loginService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout(): void {
    this.loginService.logout(); // Clear the token
    this.isLoggedIn = false;
    this.router.navigate(['/login']).then((navigationSuccess) => {
      if (navigationSuccess) {
        console.log('Redirected to login page successfully.');
      } else {
        console.error('Failed to navigate to the login page.');
      }
    });
  }

}
