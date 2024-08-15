import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service'; // Upewnij się, że importujesz poprawny serwis
import { from } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.auth.idToken$).pipe(  // Używamy strumienia idToken$
      exhaustMap(idToken => {
        console.log('Pobrany ID token:', idToken);

        if (idToken) {
          const cloned = req.clone({
            setHeaders: {
              Authorization: `Bearer ${idToken}`
            }
          });
          console.log('Żądanie z nagłówkiem Authorization:', cloned);

          return next.handle(cloned);
        }

        return next.handle(req);
      })
    );
  }
}
