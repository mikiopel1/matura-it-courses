import { Injectable } from '@angular/core';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth0Service) {}

  // Metoda do logowania użytkownika
  login(): void {
    this.auth.loginWithRedirect();
  }

  // Metoda do wylogowania użytkownika
  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  // Metoda do rejestracji użytkownika
  register(): void {
    this.auth.loginWithRedirect({
      screen_hint: 'signup'
    } as any);
  }

  // Sprawdzenie, czy użytkownik jest zalogowany
  isAuthenticated$(): Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  // Pobranie ról użytkownika (jeśli dostępne)
  get userRoles$(): Observable<string[]> {
    return this.auth.user$.pipe(
      map((user: User | null | undefined) => user && user['roles'] ? user['roles'] : [])
    );
  }

  // Pobranie ID tokenu
  get idToken$(): Observable<string | undefined> {
    return this.auth.user$.pipe(
      map((user: User | null | undefined) => user ? (user as any).id_token : undefined)
    );
    ;
  }
}
