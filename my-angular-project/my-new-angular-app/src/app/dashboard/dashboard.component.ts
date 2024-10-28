import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course/course.service';
import { AuthService } from '../auth.service';
import { StripeService } from '../stripe.service';
import { Course } from '../course/course.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  courses: Course[] = [];
  hasPremiumAccess: boolean = false;
  showCourses: boolean = false; // Kontroluje widoczność kafelków kursów

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    // Odśwież dane użytkownika i po otrzymaniu danych sprawdź dostęp i załaduj kursy
    this.authService.refreshUserData().subscribe({
      next: (response) => {
        console.log('Odświeżone dane użytkownika:', response);
        if (response && response.roles) {
          this.hasPremiumAccess = response.roles.includes('ROLE_USER_PREMIUM');
          console.log('Czy użytkownik ma dostęp premium:', this.hasPremiumAccess);
  
          if (this.hasPremiumAccess) {
            this.showCourses = true;
            this.loadCourses();
          } else {
            this.showCourses = false;
          }
        }
      },
      error: (err) => console.error('Błąd podczas odświeżania danych użytkownika:', err)
    });
  }
  

  // Sprawdzamy, czy użytkownik ma dostęp premium i ładujemy kursy, jeśli tak
  checkAccessAndLoadCourses(): void {
    this.authService.userRoles$.subscribe({
      next: (roles: string[]) => {
        console.log('Received roles from backend:', roles); // Dodatkowe logowanie ról

        // Sprawdzamy, czy użytkownik ma rolę premium
        this.hasPremiumAccess = roles.includes('ROLE_USER_PREMIUM');
        console.log('Czy użytkownik ma dostęp premium:', this.hasPremiumAccess);

        if (this.hasPremiumAccess) {
          this.showCourses = true;
          // Ładujemy kursy tylko, jeśli użytkownik ma dostęp premium
          this.loadCourses();
        } else {
          this.showCourses = false;
        }
      },
      error: (err) => console.error('Błąd podczas sprawdzania ról:', err)
    });
  }

  // Funkcja do ładowania kursów z backendu
  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (courses: Course[]) => {
        this.courses = courses;
        console.log('Otrzymane kursy:', courses); // Debugowanie otrzymanych kursów
      },
      error: (err) => console.error('Błąd podczas pobierania kursów:', err)
    });
  }

  // Funkcja do obsługi zakupu dostępu premium
  buyPremium(): void {
    const priceId = 'price_1PuJKmRw3T9NFMMMidPmJ3s2'; // Przykładowe ID dla dostępu premium
    this.stripeService.redirectToCheckout(priceId);
  }
}
