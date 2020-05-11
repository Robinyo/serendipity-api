package org.serendipity.restapi.repository;

import org.serendipity.restapi.entity.Location;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface LocationRepository extends PagingAndSortingRepository<Location, Long> {

}
