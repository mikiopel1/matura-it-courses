import { Injectable } from '@angular/core';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth0Service, private http: HttpClient) {}

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  register(): void {
    this.auth.loginWithRedirect({
      screen_hint: 'signup'
    } as any);
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  get userRoles$(): Observable<string[]> {
    return this.auth.user$.pipe(
      map((user: User | null | undefined) => {
        console.log('User data:', user); 
        return user && user['roles'] ? user['roles'] : [];
      })
    );
  }

  get idToken$(): Observable<string | undefined> {
    return this.auth.idTokenClaims$.pipe(
      map(claims => claims ? (claims as any).__raw : undefined)
    );
  }

  handleAuthCallback() {
    this.isAuthenticated$.pipe(
      switchMap(isAuthenticated => 
        isAuthenticated ? this.idToken$ : new Observable<undefined>()
      )
    ).subscribe((idToken) => {
      if (idToken) {
        this.sendTokenToBackend(idToken);
      }
    });
  }

  refreshUserData(): Observable<UserResponse | null> {
    return this.idToken$.pipe(
      switchMap((idToken) => {
        if (idToken) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
          return this.http.post<UserResponse>(`${environment.apiUrl}/api/auth/register-or-update`, {}, { headers });
        } else {
          return of(null);  // Gdy nie ma tokenu
        }
      }),
      tap((response) => {
        if (response) {
          console.log('User roles refreshed:', response.roles);  // Logujemy nowe role
        }
      })
    );
  }

  private sendTokenToBackend(idToken: string) {
    const url = `${environment.apiUrl}/api/auth/register-or-update`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    this.http.post<UserResponse>(url, {}, { headers }).subscribe({
      next: (response) => {
        console.log('Token sent successfully:', response);
        console.log('Response from backend:', response);
        
        // Obsługa odpowiedzi i ról
        if (response.roles) {
          console.log('Received roles from backend:', response.roles);
        }
      },
      error: (error) => console.error('Error sending token:', error)
    });
  }
}

// Model odpowiedzi z backendu
export interface UserResponse {
  id: number;
  auth0Id: string;
  email: string;
  username: string;
  roles: string[];
}
