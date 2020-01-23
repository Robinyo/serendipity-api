package org.serendipity.restapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class SerendipityRestApiApplication {

  public static void main(String[] args) {
    
    log.info("Serendipity REST API initialised");
    
    SpringApplication.run(SerendipityRestApiApplication.class, args);
  }

}

// https://www.baeldung.com/spring-boot-logging
