import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todomongoautenticacao, TodomongoautenticacaoRelations} from '../models';

export class TodomongoautenticacaoRepository extends DefaultCrudRepository<
  Todomongoautenticacao,
  typeof Todomongoautenticacao.prototype.id,
  TodomongoautenticacaoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Todomongoautenticacao, dataSource);
  }
}
