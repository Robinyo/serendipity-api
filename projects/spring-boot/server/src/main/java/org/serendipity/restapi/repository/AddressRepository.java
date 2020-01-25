package org.serendipity.restapi.repository;

import org.springframework.data.repository.CrudRepository;

import org.serendipity.restapi.model.Address;

public interface AddressRepository extends CrudRepository<Address, Long> {

}
