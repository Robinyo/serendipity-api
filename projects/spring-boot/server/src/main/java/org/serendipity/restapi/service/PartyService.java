package org.serendipity.restapi.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.serendipity.restapi.model.Party;
import org.serendipity.restapi.repository.PartyRepository;

@Service
public class PartyService {

  @Autowired
  private PartyRepository repository;

  public Iterable<Party> find() {

    return repository.findAll();
  }

  public Optional<Party> findById(Long id) {

    return repository.findById(id);
  }

}

// https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html
