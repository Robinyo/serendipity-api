package org.serendipity.restapi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.serendipity.restapi.model.Individual;
import org.serendipity.restapi.repository.IndividualRepository;

@Service
public class IndividualService {
  
  @Autowired
  private IndividualRepository repository;
  
  public Iterable<Individual> findAll() {
    
    return repository.findAll();
  }
  
  public Optional<Individual> findById(Long id) {
        
    return repository.findById(id);
  }

}

/*

  public List<Individual> find() {
    
    return repository.findAll();
  }

  public Individual findOne(Long id) {
        
    return repository.getOne(id);
  }

*/
