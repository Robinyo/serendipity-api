package org.serendipity.restapi.repository;

import org.springframework.data.repository.CrudRepository;

import org.serendipity.restapi.model.Individual;

public interface IndividualRepository extends CrudRepository<Individual, Long> {

}
