//package com.example.demo.model;
//
//import jakarta.persistence.*;
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import java.util.Date;
//
//@Entity
//@Table(name = "purchases")
//public class Purchase {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    @JsonBackReference
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "course_id", nullable = false)
//    @JsonBackReference
//    private Course course;
//
//    private Date purchaseDate;
//
//    // Getters and setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public Course getCourse() {
//        return course;
//    }
//
//    public void setCourse(Course course) {
//        this.course = course;
//    }
//
//    public Date getPurchaseDate() {
//        return purchaseDate;
//    }
//
//    public void setPurchaseDate(Date purchaseDate) {
//        this.purchaseDate = purchaseDate;
//    }
//}
