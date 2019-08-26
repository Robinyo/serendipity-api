import { EntityRepository, Repository } from 'typeorm';

import { Role } from '../models/role';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {

}
