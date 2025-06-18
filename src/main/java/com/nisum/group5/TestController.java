package com.nisum.group5;

import com.nisum.group5.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @GetMapping("/db")
    public ResponseEntity<String> testDbConnection() {
        try {
            long count = cartItemRepository.count(); // basic query
            return ResponseEntity.ok("Connected! Total rows: " + count);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("DB connection failed: " + e.getMessage());
        }
    }
}
