package org.serendipity.restapi.repository;

import org.springframework.data.repository.CrudRepository;

import org.serendipity.restapi.model.Individual;
// import org.springframework.web.bind.annotation.CrossOrigin;

// @CrossOrigin
public interface IndividualRepository extends CrudRepository<Individual, Long> {

}

// https://docs.spring.io/spring-data/rest/docs/current-SNAPSHOT/reference/html/#customizing-sdr.configuring-cors
