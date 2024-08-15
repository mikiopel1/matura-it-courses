package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.model.Course;
import com.example.demo.model.Purchase;
import com.example.demo.repository.PurchaseRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository, UserRepository userRepository, CourseRepository courseRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    public boolean hasUserPurchasedCourse(Long userId, Long courseId) {
        return purchaseRepository.existsByUserIdAndCourseId(userId, courseId);
    }

    public void purchaseCourse(Long userId, Long courseId) {
        if (!hasUserPurchasedCourse(userId, courseId)) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Course course = courseRepository.findById(courseId)
                    .orElseThrow(() -> new RuntimeException("Course not found"));

            Purchase purchase = new Purchase();
            purchase.setUser(user); // Ustawiamy obiekt User
            purchase.setCourse(course); // Ustawiamy obiekt Course
            purchase.setPurchaseDate(new Date());
            purchaseRepository.save(purchase);
        }
    }
}
