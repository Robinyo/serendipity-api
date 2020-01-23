package org.serendipity.restapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.serendipity.restapi.model.Individual;
import org.serendipity.restapi.repository.IndividualRepository;

@Service
public class IndividualService {
  
  @Autowired
  private IndividualRepository repository;
  
  public List<Individual> find() {
    
    return repository.findAll();
  }
  
  public Individual findOne(Long id) {
    
    return repository.getOne(id);
  }

}
