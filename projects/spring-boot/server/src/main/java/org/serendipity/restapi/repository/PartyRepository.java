package org.serendipity.restapi.repository;

import org.springframework.data.repository.CrudRepository;

import org.serendipity.restapi.model.Party;

public interface PartyRepository extends CrudRepository<Party, Long> {

}

// JpaRepository is JPA specific extension of Repository.
// It contains the full API of CrudRepository and PagingAndSortingRepository.
// So it contains API for basic CRUD operations and also API for pagination and sorting.
