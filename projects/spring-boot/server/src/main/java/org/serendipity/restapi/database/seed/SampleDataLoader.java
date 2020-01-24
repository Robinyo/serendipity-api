package org.serendipity.restapi.database.seed;

import lombok.extern.slf4j.Slf4j;

import org.serendipity.restapi.repository.IndividualRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class SampleDataLoader implements CommandLineRunner {
  
  @Autowired
  private IndividualRepository repository;

  @Override
  public void run(String... args) throws Exception {
    
    log.info("Loading sample data ...");
  
  
    // repository.save(new Entity(...));
  }
  
}
