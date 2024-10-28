import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Course } from './course.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = `${environment.apiUrl}/api/courses`; // Dynamiczny URL z environment

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`).pipe( // Użycie responseType: 'json' domyślnie
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Błąd po stronie klienta lub sieci
      console.error('Client-side error:', error.error.message);
    } else {
      // Błąd serwera
      console.error(
        `Server-side error. Code: ${error.status}\n` +
        `Error: ${error.error}\n` +
        `Message: ${error.message}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  hasAccess(course: Course, userRoles: string[]): boolean {
    return !course.allowedRoles || course.allowedRoles.length === 0 || 
           course.allowedRoles.some(role => userRoles.includes(role));
  }
}
