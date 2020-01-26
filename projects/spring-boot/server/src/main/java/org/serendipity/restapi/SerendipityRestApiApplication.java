package org.serendipity.restapi;

import lombok.extern.slf4j.Slf4j;

import org.serendipity.restapi.config.AuditorAwareConfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
@SpringBootApplication
@Slf4j
public class SerendipityRestApiApplication {

  @Bean
  public AuditorAwareConfig auditorProvider() {
    return new AuditorAwareConfig();
  }
  
  public static void main(String[] args) {
    
    log.info("Serendipity REST API initialised");
    
    SpringApplication.run(SerendipityRestApiApplication.class, args);
  }

}

// https://www.baeldung.com/spring-boot-logging
