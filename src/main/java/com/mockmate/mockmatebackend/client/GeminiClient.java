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

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    public String generate(String prompt) {
        RestTemplate restTemplate = new RestTemplate();

        // 1. Build the correct nested payload structure for Gemini
        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> body = new HashMap<>();
        body.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        // 2. FIXED: Properly append the key parameter using "?key="
        String fullUrl = GEMINI_URL + "?key=" + apiKey;

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    fullUrl, request, Map.class
            );

            // 3. Safely extract the text from the response map
            Map responseBody = response.getBody();
            if (responseBody == null) {
                throw new RuntimeException("Empty response body received from Gemini API");
            }

            List candidates = (List) responseBody.get("candidates");
            Map candidate = (Map) candidates.get(0);
            Map contentMap = (Map) candidate.get("content");
            List parts = (List) contentMap.get("parts");
            Map firstPart = (Map) parts.get(0);

            return (String) firstPart.get("text");

        } catch (Exception e) {
            throw new RuntimeException("Gemini API call failed: " + e.getMessage(), e);
        }
    }
}