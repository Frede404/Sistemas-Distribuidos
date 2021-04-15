import {Entity, model, property} from '@loopback/repository';

@model()
export class Todomongo extends Entity {
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


  constructor(data?: Partial<Todomongo>) {
    super(data);
  }
}

export interface TodomongoRelations {
  // describe navigational properties here
}

export type TodomongoWithRelations = Todomongo & TodomongoRelations;
