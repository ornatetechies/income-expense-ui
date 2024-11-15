import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:4000/api/user'; // Backend base URL

  private isLoggedInSubject = new BehaviorSubject<boolean>(!!this.getToken());

  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable for login state

  constructor(private http: HttpClient) {}

  /**
   * Sends login request to the backend.
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @returns Observable containing the backend response.
   */
  login(username: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Ensure query parameters are passed correctly
    const params = { userName: username, password: password };

    return this.http.post<any>(`${this.baseUrl}/login`, {}, { headers, params });
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true); // Update login state
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false); // Update login state
  }
}
