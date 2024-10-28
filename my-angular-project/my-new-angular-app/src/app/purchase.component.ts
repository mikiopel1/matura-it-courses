import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StripeService } from './stripe.service';
import { environment } from './environment'; // Import środowiska

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
})
export class PurchaseComponent {
  constructor(private http: HttpClient, private stripeService: StripeService, private router: Router) {}

  buyCourse(courseId: number) {
    this.http.post<{ sessionId: string }>(`${environment.apiUrl}/api/stripe/create-checkout-session`, { courseId })
      .subscribe(response => {
        this.stripeService.redirectToCheckout(response.sessionId).then(() => {
          // Po udanym zakończeniu płatności przekieruj do strony sukcesu
          this.router.navigate(['/purchase-success']);
        }).catch(err => {
          console.error('Error during checkout:', err);
        });
      });
  }
}
