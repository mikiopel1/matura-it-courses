import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from './environment'; // Import środowiska

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe('pk_test_51PsUuSRw3T9NFMMMOVCmGHuwTGGTzBAv3XUn2VgwBQnumSHxOONLFaKDS7mgn2WlfuIPWCXpUsX5rmrmnYnMGBAR00CN4sRAx0');  // Upewnij się, że używasz właściwego klucza
  }

  async redirectToCheckout(priceId: string) {
    const stripe = await this.stripePromise;

    if (!stripe) {
      console.error('Stripe.js has not loaded properly.');
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: priceId, // Upewnij się, że 'priceId' to ID istniejącego produktu lub cennika w Stripe
        quantity: 1
      }],
      mode: 'payment',
      successUrl: `${environment.frontendUrl}/purchase-success`, // Zaktualizuj URL sukcesu
      cancelUrl: `${environment.frontendUrl}/purchase-cancel`   // Zaktualizuj URL anulowania
    });

    if (error) {
      console.error('There was an error during the redirect to checkout:', error);
    }
  }
}
