package org.serendipity.restapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.serendipity.restapi.model.Party;
import org.serendipity.restapi.repository.PartyRepository;

@Service
public class PartyService {
  
  @Autowired
  private PartyRepository repository;
  
  public List<Party> find() {
    
    return repository.findAll();
  }
  
  public Party findOne(Long id) {
    
    return repository.getOne(id);
  }

}

// https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html
