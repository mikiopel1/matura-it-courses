import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  setCurrentUserId(userId: number | null): void {
    if (userId !== null) {
      localStorage.setItem('currentUserId', userId.toString());
    } else {
      localStorage.removeItem('currentUserId');
    }
  }

  getCurrentUserId(): number | null {
    const userId = localStorage.getItem('currentUserId');
    return userId ? +userId : null;
  }
}
