import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from './course.service';
import { AuthService } from '../auth.service';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseAccessService {

  constructor(private courseService: CourseService, private authService: AuthService) {}

  getCourseWithAccessCheck(courseId: number): Observable<{ course: Course, canAccess: boolean }> {
    return forkJoin({
      course: this.courseService.getCourse(courseId),
      userRoles: this.authService.getUserRoles()
    }).pipe(
      map(({ course, userRoles }) => ({
        course,
        canAccess: this.courseService.hasAccess(course, userRoles)
      }))
    );
  }
}
