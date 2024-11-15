import { Component } from '@angular/core';
import {LoginService} from "./login/login-form/login.service";
import {delay} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'income-expenses-ui';

  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}


  ngOnInit(): void {
    this.loginService.isLoggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.handleLogin();
      } else {
        this.handleLogout();
      }
    });
  }




  private handleLogin(): void {
    // Delay the header appearance after login
    setTimeout(() => {
      this.isLoggedIn = true;
    }, 1100);
  }

  private handleLogout(): void {
    // Immediately hide the header on logout
    this.isLoggedIn = false;
  }
}
