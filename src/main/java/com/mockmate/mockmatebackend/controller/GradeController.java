package com.mockmate.mockmatebackend.controller;

import com.mockmate.mockmatebackend.dto.GradeRequest;
import com.mockmate.mockmatebackend.dto.GradeResponse;
import com.mockmate.mockmatebackend.service.GradingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")   // FIXED: Added explicit base path
public class GradeController {

    private final GradingService gradingService;

    public GradeController(GradingService gradingService) {
        this.gradingService = gradingService;
    }

    @PostMapping("/grade")        // This maps to: POST http://localhost:8080/api/grade
    public ResponseEntity<?> grade(@RequestBody GradeRequest request) {
        try {
            GradeResponse response = gradingService.grade(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Returns a clean error object instead of broken string concat
            return ResponseEntity.internalServerError()
                    .body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/health")        // This maps to: GET http://localhost:8080/api/health
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(java.util.Map.of("status", "ok"));
    }
}