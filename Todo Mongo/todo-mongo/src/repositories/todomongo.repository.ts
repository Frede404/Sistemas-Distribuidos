import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todomongo, TodomongoRelations} from '../models';

export class TodomongoRepository extends DefaultCrudRepository<
  Todomongo,
  typeof Todomongo.prototype.id,
  TodomongoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Todomongo, dataSource);
  }
}
