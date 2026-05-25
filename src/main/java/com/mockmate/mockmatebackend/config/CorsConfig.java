package com.mockmate.mockmatebackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost:5174",   // Vite dev server
                        "http://localhost:5173",
                        "https://your-app.vercel.app" // Add after Vercel deploy
                )
                .allowedMethods("POST", "GET", "OPTIONS");
    }
}
