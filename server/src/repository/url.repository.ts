import { EntityRepository, Repository } from 'typeorm';
import { Url } from '../domain/url.entity';

@EntityRepository(Url)
export class UrlRepository extends Repository<Url> {}
