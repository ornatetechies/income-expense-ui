import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Transaction {
  userId: number;
  amount: number;
  type: string;
  description?: string;
  transactionDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class IncomeExpensesService {
  private baseUrl = 'http://localhost:4000/api/transactions'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }


  sendTransaction(transaction: Transaction): Observable<any> {
    const token = localStorage.getItem('authToken'); // Adjust token retrieval method
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(this.baseUrl, transaction, { headers });
  }
}
