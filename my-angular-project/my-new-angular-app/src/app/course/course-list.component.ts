import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { AuthService } from '../auth.service';
import { Course } from './course.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];  // Lista kursów
  userRoles: string[] = [];

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$().pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.courseService.getCourses();  // Pobranie kursów tylko jeśli użytkownik jest zalogowany
        } else {
          console.log('Użytkownik nie jest zalogowany');
          return [];  // Pusty wynik, jeśli użytkownik nie jest zalogowany
        }
      })
    ).subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
      },
      error: (err) => console.error('Błąd podczas pobierania kursów:', err)
    });
  }
}
