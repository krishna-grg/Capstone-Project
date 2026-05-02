package edu.unk.findmybook.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CacheDebugConfig {

    //caching beean
    @Bean
    CommandLineRunner cacheDebug(CacheManager cacheManager) {
        return args -> {
            System.out.println("CACHE MANAGER USED: " + cacheManager.getClass().getName());
        };
    }
    //runner bean to print the class name of the cache manager being used at application startup
}