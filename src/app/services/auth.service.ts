import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { ApiResponse } from '../Interfaces/ApiResponse';
import { UserData } from '../Interfaces/UserData';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private apiUrl = 'http://localhost:22253/api/account';
  private authToken: string | null = null;


  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, credentials);
  }
  signup(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<any>(url, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        // Check if the error has a response body containing error messages
        if (error.error && error.error instanceof Array) {
          return throwError(() => error.error); // Pass error messages as a factory function
        } else {
          return throwError(() => 'An unexpected error occurred.'); // Pass a fallback error message
        }
      })
    );
  }


  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }


}
