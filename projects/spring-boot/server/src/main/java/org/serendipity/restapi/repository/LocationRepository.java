package org.serendipity.restapi.repository;

import org.springframework.data.repository.CrudRepository;

import org.serendipity.restapi.model.Location;

public interface LocationRepository extends CrudRepository<Location, Long> {

}
