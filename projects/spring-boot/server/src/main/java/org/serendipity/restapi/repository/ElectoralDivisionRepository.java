package org.serendipity.restapi.repository;

import org.serendipity.restapi.entity.ElectoralDivision;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ElectoralDivisionRepository extends PagingAndSortingRepository<ElectoralDivision, Long> {

  Page<ElectoralDivision> findAll(Pageable pageable);

  Page<ElectoralDivision> findByName(String name, Pageable pageable);

}
