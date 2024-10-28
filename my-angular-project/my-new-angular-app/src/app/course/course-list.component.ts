import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { AuthService } from '../auth.service';
import { Course } from './course.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';  // Dodaj import of, aby zwrócić pustą tablicę w razie potrzeby

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];  // Lista kursów
  userRoles: string[] = [];  // Lista ról użytkownika

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Poprawka: Usuń () po isAuthenticated$
    this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.courseService.getCourses();  // Pobranie kursów tylko jeśli użytkownik jest zalogowany
        } else {
          console.log('Użytkownik nie jest zalogowany');
          return of([]);  // Zwrócenie pustej tablicy, jeśli użytkownik nie jest zalogowany
        }
      })
    ).subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (err: any) => console.error('Błąd podczas pobierania kursów:', err)
    });
  }
}
