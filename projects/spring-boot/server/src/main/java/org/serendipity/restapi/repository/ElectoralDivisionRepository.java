package org.serendipity.restapi.repository;

import org.serendipity.restapi.entity.ElectoralDivision;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface ElectoralDivisionRepository extends PagingAndSortingRepository<ElectoralDivision, Long> {

  Page<ElectoralDivision> findAll(Pageable pageable);

  Optional<ElectoralDivision> findByName(String name);

}
