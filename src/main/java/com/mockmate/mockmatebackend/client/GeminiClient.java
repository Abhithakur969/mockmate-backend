package com.mockmate.mockmatebackend.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Component
public class GeminiClient {

    @Value("${gemini.api.key}")
    private String apiKey;

    // Updated to the stable, high-availability production model URL
    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent";

    public String generate(String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        // 1. Build payload structure
        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> body = new HashMap<>();
        body.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        String fullUrl = GEMINI_URL + "?key=" + apiKey;

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, request, Map.class);
            Map<?, ?> responseBody = response.getBody();

            if (responseBody == null) {
                throw new RuntimeException("Empty response body received from Gemini API");
            }

            List<?> candidates = (List<?>) responseBody.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                throw new RuntimeException("No candidates returned from Gemini API");
            }

            Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
            Map<?, ?> contentMap = (Map<?, ?>) candidate.get("content");
            List<?> parts = (List<?>) contentMap.get("parts");
            Map<?, ?> firstPart = (Map<?, ?>) parts.get(0);

            return (String) firstPart.get("text");

        } catch (Exception e) {
            throw new RuntimeException("Gemini API call failed: " + e.getMessage(), e);
        }
    }
}