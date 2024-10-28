import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from './course.service';
import { AuthService } from '../auth.service';
import { StripeService } from '../stripe.service';
import { Course } from './course.model';
import { take, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {

  course: Course | null = null;
  userRoles: string[] = [];
  hasAccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private stripeService: StripeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.authService.userRoles$.pipe(
        take(1),
        switchMap((roles: string[]) => {
          this.userRoles = roles;
          return this.courseService.getCourse(+courseId);
        })
      ).subscribe({
        next: (course: Course) => {
          this.course = course;
          this.checkAccess();
        },
        error: (err) => {
          console.error('Błąd podczas pobierania kursu:', err);
          this.router.navigate(['/404']);
        }
      });
    } else {
      console.error('Nieprawidłowy ID kursu:', courseId);
      this.router.navigate(['/404']);
    }
  }

  private checkAccess(): void {
    this.authService.isAuthenticated$.pipe(take(1)).subscribe((isAuthenticated: boolean) => {
      if (isAuthenticated) {
        this.hasAccess = this.courseService.hasAccess(this.course!, this.userRoles);
        if (!this.hasAccess) {
          console.warn('Użytkownik nie ma dostępu do tego kursu.');
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  buyCourse(): void {
    if (this.course) {
      const priceId = 'price_1PuJKmRw3T9NFMMMidPmJ3s2'; // Zastąp odpowiednim priceId
      this.stripeService.redirectToCheckout(priceId);
    }
  }
}
