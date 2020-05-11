package org.serendipity.restapi.repository;

import org.serendipity.restapi.entity.Role;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {

}
