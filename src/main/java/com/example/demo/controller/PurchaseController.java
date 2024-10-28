//package com.example.demo.controller;
//
//import com.example.demo.model.User;
//import com.example.demo.service.PurchaseService;
//import com.example.demo.service.UserService;
//import lombok.Data;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/purchases")
//public class PurchaseController {
//
//    private final PurchaseService purchaseService;
//    private final UserService userService;
//
//    public PurchaseController(PurchaseService purchaseService, UserService userService) {
//        this.purchaseService = purchaseService;
//        this.userService = userService;
//    }
//
//    @PostMapping
//    public ResponseEntity<Void> purchaseCourse(@RequestBody PurchaseRequest purchaseRequest, @AuthenticationPrincipal Jwt jwt) {
//        User user = userService.findOrCreateUser(jwt);
//        Long courseId = purchaseRequest.getCourseId();
//
//        if (!purchaseService.hasUserPurchasedCourse(user.getId(), courseId)) {
//            purchaseService.purchaseCourse(user.getId(), courseId);
//        }
//
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }
//
//    @Data
//    public static class PurchaseRequest {
//        private Long courseId;
//    }
//}
