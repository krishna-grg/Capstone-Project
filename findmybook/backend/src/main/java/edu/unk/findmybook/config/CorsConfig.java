package edu.unk.findmybook.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    //bean to configure CORS settings 
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(
                                "http://localhost:5173",
                                "http://localhost:5174",
                                "http://172.20.10.2:5173",
                                 "http://192.168.1.87:5173",
                                 "http://10.71.71.188:5173"
                        
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        
                        .allowedHeaders("*");
            }
        };
    }
}