//package com.example.demo.service;
//
//import com.example.demo.model.User;
//import com.example.demo.model.Course;
//import com.example.demo.model.Purchase;
//import com.example.demo.model.Role;
//import com.example.demo.repository.PurchaseRepository;
//import com.example.demo.repository.UserRepository;
//import com.example.demo.repository.CourseRepository;
//import com.example.demo.repository.RoleRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.Date;
//
//@Service
//public class PurchaseService {
//
//    private final PurchaseRepository purchaseRepository;
//    private final UserRepository userRepository;
//    private final CourseRepository courseRepository;
//    private final RoleRepository roleRepository;
//
//    @Autowired
//    public PurchaseService(PurchaseRepository purchaseRepository, UserRepository userRepository, CourseRepository courseRepository, RoleRepository roleRepository) {
//        this.purchaseRepository = purchaseRepository;
//        this.userRepository = userRepository;
//        this.courseRepository = courseRepository;
//        this.roleRepository = roleRepository;
//    }
//
//    public boolean hasUserPurchasedCourse(Long userId, Long courseId) {
//        return purchaseRepository.existsByUserIdAndCourseId(userId, courseId);
//    }
//
//    public void purchaseCourse(Long userId, Long courseId) {
//        if (!hasUserPurchasedCourse(userId, courseId)) {
//            User user = userRepository.findById(userId)
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//            Course course = courseRepository.findById(courseId)
//                    .orElseThrow(() -> new RuntimeException("Course not found"));
//
//            Purchase purchase = new Purchase();
//            purchase.setUser(user);
//            purchase.setCourse(course);
//            purchase.setPurchaseDate(new Date());
//            purchaseRepository.save(purchase);
//
//            // Zmiana roli użytkownika po zakupie
//            Role premiumRole = roleRepository.findByName("ROLE_USER_PREMIUM")
//                    .orElseThrow(() -> new RuntimeException("Role not found"));
//            user.getRoles().clear();  // Opcjonalnie usuwamy stare role
//            user.getRoles().add(premiumRole);
//
//            userRepository.save(user);
//        }
//    }
//}
