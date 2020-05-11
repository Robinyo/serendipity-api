package org.serendipity.restapi.repository;

import org.serendipity.restapi.entity.Organisation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrganisationRepository extends PagingAndSortingRepository<Organisation, Long> {

  Page<Organisation> findAll(Pageable pageable);

  Page<Organisation> findByName(String name, Pageable pageable);
  Page<Organisation> findByNameStartsWith(String name, Pageable pageable);

}

// https://docs.spring.io/spring-data/rest/docs/current/reference/html/#paging-and-sorting

/*

  Page<Organisation> findByName(@Param("name") String name, Pageable pageable);

  Page<Organisation> findByNameStartsWith(@Param("name") String name, Pageable pageable);

*/
