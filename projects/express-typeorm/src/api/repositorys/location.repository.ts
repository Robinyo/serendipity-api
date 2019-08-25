import { EntityRepository, Repository } from 'typeorm';

import { Location } from '../models/location';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {

}
