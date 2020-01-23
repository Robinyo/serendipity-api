package org.serendipity.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.serendipity.restapi.model.Individual;

@Repository
public interface IndividualRepository extends JpaRepository<Individual, Long> {

}
