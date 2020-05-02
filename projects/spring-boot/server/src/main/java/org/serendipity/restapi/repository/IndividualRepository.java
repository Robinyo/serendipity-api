package org.serendipity.restapi.repository;

import org.serendipity.restapi.entity.Individual;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

// @Repository
public interface IndividualRepository extends PagingAndSortingRepository<Individual, Long> {

    Page<Individual> findAll(Pageable pageable);

}
