import {Entity, model, property} from '@loopback/repository';

@model()
export class Todomongoautenticacao extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    default: 1,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'boolean',
  })
  isComplete?: boolean;

  @property({
    type: 'string',
  })
  remiAtAdress?: string;

  @property({
    type: 'string',
  })
  remiAtGeo?: string;

  @property({
    type: 'any',
  })
  tag?: any;


  constructor(data?: Partial<Todomongoautenticacao>) {
    super(data);
  }
}

export interface TodomongoautenticacaoRelations {
  // describe navigational properties here
}

export type TodomongoautenticacaoWithRelations = Todomongoautenticacao & TodomongoautenticacaoRelations;
