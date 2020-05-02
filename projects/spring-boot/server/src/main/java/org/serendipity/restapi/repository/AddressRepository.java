package org.serendipity.restapi.repository;

import org.serendipity.restapi.entity.Address;
import org.springframework.data.repository.PagingAndSortingRepository;

// @Repository
public interface AddressRepository extends PagingAndSortingRepository<Address, Long> {

}
