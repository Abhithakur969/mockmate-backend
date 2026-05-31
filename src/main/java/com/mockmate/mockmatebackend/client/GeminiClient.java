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

    private static final List<String> GEMINI_MODELS = List.of(
            "gemini-2.5-flash-lite",
            "gemini-2.5-flash",        // Fallback 1
            "gemini-2.5-pro"
    );

    private static final String BASE_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent";

    public String generate(String prompt) {
        List<String> errors = new ArrayList<>();

        for (String model : GEMINI_MODELS) {
            try {
                String result = callGemini(prompt, model);
                System.out.println("[GeminiClient] ✅ Success with model: " + model);
                return result;
            } catch (RateLimitException e) {
                // 429 — wait the suggested delay then try next model immediately
                System.err.println("[GeminiClient] ⏳ Rate limited on [" + model + "], retry in " + e.retryAfterSeconds + "s. Switching model...");
                errors.add("Model [" + model + "] rate limited (429): retry in " + e.retryAfterSeconds + "s");
                // Don't sleep — just move to next model in fallback chain
            } catch (Exception e) {
                System.err.println("[GeminiClient] ❌ Model [" + model + "] failed: " + e.getMessage());
                errors.add("Model [" + model + "] failed: " + e.getMessage());
            }
        }

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

        // Catch API-level errors (quota, model not found, etc.)
        if (responseBody.containsKey("error")) {
            Map<?, ?> errorBlock = (Map<?, ?>) responseBody.get("error");
            int code = (int) errorBlock.get("code");
            String message = (String) errorBlock.get("message");

            if (code == 429) {
                // Extract retry delay if present
                int retryAfter = extractRetryDelay(errorBlock);
                throw new RateLimitException(message, retryAfter);
            }
            throw new RuntimeException("API error " + code + ": " + message);
        }

        List<?> candidates = (List<?>) responseBody.get("candidates");
        if (candidates == null || candidates.isEmpty()) {
            throw new RuntimeException("No candidates returned");
        }

        Map<?, ?> candidate  = (Map<?, ?>) candidates.get(0);
        Map<?, ?> contentMap = (Map<?, ?>) candidate.get("content");
        List<?> parts        = (List<?>) contentMap.get("parts");
        Map<?, ?> firstPart  = (Map<?, ?>) parts.get(0);

        return (String) firstPart.get("text");
    }

    /** Pulls retryDelay seconds out of the error details block if present */
    @SuppressWarnings("unchecked")
    private int extractRetryDelay(Map<?, ?> errorBlock) {
        try {
            List<?> details = (List<?>) errorBlock.get("details");
            if (details != null) {
                for (Object detail : details) {
                    Map<String, Object> d = (Map<String, Object>) detail;
                    if (d.containsKey("retryDelay")) {
                        String delay = (String) d.get("retryDelay"); // e.g. "25s"
                        return Integer.parseInt(delay.replace("s", "").trim());
                    }
                }
            }
        } catch (Exception ignored) {}
        return 30; // default fallback
    }

    /** Custom exception to distinguish 429 from other failures */
    private static class RateLimitException extends RuntimeException {
        final int retryAfterSeconds;
        RateLimitException(String message, int retryAfterSeconds) {
            super(message);
            this.retryAfterSeconds = retryAfterSeconds;
        }
    }
}