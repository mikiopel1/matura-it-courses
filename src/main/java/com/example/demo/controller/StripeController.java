package com.example.demo.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stripe")
public class StripeController {

    private static final Logger logger = LoggerFactory.getLogger(StripeController.class);

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${frontend.url}/success")
    private String successUrl;

    @Value("${frontend.url}/cancel")
    private String cancelUrl;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, Object> data) {
        Stripe.apiKey = stripeApiKey;

        try {
            // Tworzenie parametrów sesji
            SessionCreateParams params =
                    SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(successUrl)
                    .setCancelUrl(cancelUrl)
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.BLIK)
                    .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                    .addLineItem(
                            SessionCreateParams.LineItem.builder()
                                    .setQuantity(1L)
                                    .setPriceData(
                                            SessionCreateParams.LineItem.PriceData.builder()
                                                    .setCurrency("pln")
                                                    .setUnitAmount(20000L) // Cena w groszach
                                                    .setProductData(
                                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                    .setName("Example Course")
                                                                    .build())
                                                    .build())
                                    .build())
                    .build();

            // Tworzenie sesji Stripe Checkout
            Session session = Session.create(params);

            logger.info("Created Checkout Session with ID: {}", session.getId());

            Map<String, String> responseData = new HashMap<>();
            responseData.put("sessionId", session.getId());

            return ResponseEntity.ok(responseData);

        } catch (StripeException e) {
            logger.error("Error while creating Stripe Checkout Session: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body(null);
        }
    }
}
