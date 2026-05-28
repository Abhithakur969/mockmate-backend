package com.mockmate.mockmatebackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                // Allows local servers and the specific Vercel deployment
                .allowedOriginPatterns(
                        "http://localhost:5173",
                        "http://localhost:5174",
                        "https://mockmate-frontend-chi.vercel.app" // Fixed typo and removed trailing slash
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Authorization")
                .allowCredentials(true)
                .maxAge(3600); // Caches preflight request answers for 1 hour
    }
}