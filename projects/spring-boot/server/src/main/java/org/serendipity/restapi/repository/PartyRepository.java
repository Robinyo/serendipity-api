package org.serendipity.restapi.repository;

import org.serendipity.restapi.entity.Party;
import org.springframework.data.repository.PagingAndSortingRepository;

// @Repository
public interface PartyRepository extends PagingAndSortingRepository<Party, Long> {

}
