package org.serendipity.restapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.serendipity.restapi.model.Party;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {

}

// JpaRepository is JPA specific extension of Repository.
// It contains the full API of CrudRepository and PagingAndSortingRepository.
// So it contains API for basic CRUD operations and also API for pagination and sorting.
