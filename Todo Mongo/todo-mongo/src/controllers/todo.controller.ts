import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Todomongo} from '../models';
import {TodomongoRepository} from '../repositories';

export class TodoController {
  constructor(
    @repository(TodomongoRepository)
    public todomongoRepository : TodomongoRepository,
  ) {}

  @post('/todomongos')
  @response(200, {
    description: 'Todomongo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todomongo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomongo, {
            title: 'NewTodomongo',
            exclude: ['id'],
          }),
        },
      },
    })
    todomongo: Todomongo,
  ): Promise<Todomongo> {
	
	//ultimo registo da bd
	let ultimoRegisto = await this.todomongoRepository.findOne({order: ['id DESC']});
	
	//auto incrementacao do id
	if(ultimoRegisto!=null){
		let auxIncrementa = parseInt(''+ultimoRegisto.id,10);
		auxIncrementa=auxIncrementa+1;
		todomongo.id=auxIncrementa;
	}
    return this.todomongoRepository.create(todomongo);
  }

  @get('/todomongos/count')
  @response(200, {
    description: 'Todomongo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Todomongo) where?: Where<Todomongo>,
  ): Promise<Count> {
    return this.todomongoRepository.count(where);
  }

  @get('/todomongos')
  @response(200, {
    description: 'Array of Todomongo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todomongo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Todomongo) filter?: Filter<Todomongo>,
  ): Promise<Todomongo[]> {
    return this.todomongoRepository.find(filter);
  }

  @patch('/todomongos')
  @response(200, {
    description: 'Todomongo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomongo, {partial: true}),
        },
      },
    })
    todomongo: Todomongo,
    @param.where(Todomongo) where?: Where<Todomongo>,
  ): Promise<Count> {
    return this.todomongoRepository.updateAll(todomongo, where);
  }

  @get('/todomongos/{id}')
  @response(200, {
    description: 'Todomongo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todomongo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Todomongo, {exclude: 'where'}) filter?: FilterExcludingWhere<Todomongo>
  ): Promise<Todomongo> {
    return this.todomongoRepository.findById(id, filter);
  }

  @patch('/todomongos/{id}')
  @response(204, {
    description: 'Todomongo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomongo, {partial: true}),
        },
      },
    })
    todomongo: Todomongo,
  ): Promise<void> {
    await this.todomongoRepository.updateById(id, todomongo);
  }

  @put('/todomongos/{id}')
  @response(204, {
    description: 'Todomongo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todomongo: Todomongo,
  ): Promise<void> {
    await this.todomongoRepository.replaceById(id, todomongo);
  }

  @del('/todomongos/{id}')
  @response(204, {
    description: 'Todomongo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todomongoRepository.deleteById(id);
  }
}
