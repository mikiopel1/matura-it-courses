package com.example.demo.controller;

import com.example.demo.service.UserService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/stripe")
public class StripeWebhookController {

    private static final Logger logger = LoggerFactory.getLogger(StripeWebhookController.class);

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    private final UserService userService;

    @Autowired
    public StripeWebhookController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        if (endpointSecret == null || endpointSecret.isEmpty()) {
            logger.error("Webhook endpoint secret is not configured");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Webhook configuration error");
        }

        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            logger.info("Received event type: {}", event.getType());
        } catch (SignatureVerificationException e) {
            logger.error("Stripe signature verification failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Stripe signature");
        } catch (Exception e) {
            logger.error("Webhook error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }

        handleEvent(event);
        return ResponseEntity.ok("Webhook received");
    }

    private void handleEvent(Event event) {
        if ("checkout.session.completed".equals(event.getType())) {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            Session session = (Session) dataObjectDeserializer.getObject().orElse(null);

            if (session != null && session.getCustomerDetails() != null) {
                String userEmail = session.getCustomerDetails().getEmail();

                // Znajdź użytkownika na podstawie emaila i zaktualizuj jego rolę na PREMIUM
                userService.findUniqueByEmail(userEmail).ifPresent(user -> {
                    userService.updateUserRoleToPremium(user);
                    logger.info("Zaktualizowano rolę użytkownika na PREMIUM dla: {}", userEmail);
                });
            } else {
                logger.warn("Nie można przetworzyć sesji: brak danych sesji lub szczegółów klienta.");
            }
        } else {
            logger.warn("Unhandled event type: {}", event.getType());
        }
    }
}
