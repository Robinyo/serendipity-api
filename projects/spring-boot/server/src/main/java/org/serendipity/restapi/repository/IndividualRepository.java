package org.serendipity.restapi.repository;

import org.springframework.data.repository.CrudRepository;

import org.serendipity.restapi.model.Individual;

public interface IndividualRepository extends CrudRepository<Individual, Long> {

}

/*

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndividualRepository extends JpaRepository<Individual, Long> {

}

*/
