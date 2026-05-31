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

    // Fallback chain — tried in order until one succeeds
    private static final List<String> GEMINI_MODELS = List.of(
            "gemini-2.0-flash",        // Primary: fast, cheap, widely available
            "gemini-1.5-flash",        // Fallback 1: stable and reliable
            "gemini-1.5-flash-8b",     // Fallback 2: lightweight backup
            "gemini-1.5-pro"           // Fallback 3: most capable, use as last resort
    );

    private static final String BASE_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent";

    public String generate(String prompt) {
        List<String> errors = new ArrayList<>();

        for (String model : GEMINI_MODELS) {
            try {
                String result = callGemini(prompt, model);
                System.out.println("[GeminiClient] Success with model: " + model);
                return result;
            } catch (Exception e) {
                String error = "Model [" + model + "] failed: " + e.getMessage();
                System.err.println("[GeminiClient] " + error);
                errors.add(error);
            }
        }

        // All models failed — throw with full error context
        throw new RuntimeException(
                "All Gemini models failed. Errors:\n" + String.join("\n", errors)
        );
    }

    private String callGemini(String prompt, String model) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> part = new HashMap<>();
        part.put("text", prompt);

        Map<String, Object> content = new HashMap<>();
        content.put("parts", List.of(part));

        Map<String, Object> body = new HashMap<>();
        body.put("contents", List.of(content));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        String fullUrl = String.format(BASE_URL, model) + "?key=" + apiKey;

        ResponseEntity<Map> response = restTemplate.postForEntity(fullUrl, request, Map.class);
        Map<?, ?> responseBody = response.getBody();

        if (responseBody == null) {
            throw new RuntimeException("Empty response body");
        }

        // Check for API-level error block (e.g. quota exceeded, invalid model)
        if (responseBody.containsKey("error")) {
            Map<?, ?> errorBlock = (Map<?, ?>) responseBody.get("error");
            throw new RuntimeException("API error: " + errorBlock.get("message"));
        }

        List<?> candidates = (List<?>) responseBody.get("candidates");
        if (candidates == null || candidates.isEmpty()) {
            throw new RuntimeException("No candidates returned");
        }

        Map<?, ?> candidate     = (Map<?, ?>) candidates.get(0);
        Map<?, ?> contentMap    = (Map<?, ?>) candidate.get("content");
        List<?> parts           = (List<?>) contentMap.get("parts");
        Map<?, ?> firstPart     = (Map<?, ?>) parts.get(0);

        return (String) firstPart.get("text");
    }
}