package com.mockmate.mockmatebackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost:5174",
                        "http://localhost:5173",
                        "https://mockmate-frontend-chi.vercel.app" // Matches your live Vercel domain
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true); // CRITICAL: Allows Axios to send processing requests securely
    }
}