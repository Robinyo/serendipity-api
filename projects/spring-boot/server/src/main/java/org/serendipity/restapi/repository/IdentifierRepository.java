package org.serendipity.restapi.repository;

import org.serendipity.restapi.entity.Identifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface IdentifierRepository extends PagingAndSortingRepository<Identifier, Long> {

  Page<Identifier> findAll(Pageable pageable);

  Page<Identifier> findByType(String type, Pageable pageable);

}
