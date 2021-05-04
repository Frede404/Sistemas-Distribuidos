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
import {Todomongoautenticacao} from '../models';
import {TodomongoautenticacaoRepository} from '../repositories';

// ---------- ADD IMPORTS -------------
import {authenticate} from '@loopback/authentication';
// ------------------------------------

@authenticate('jwt')// <---- Apply the @authenticate decorator at the class level
export class TodoController {
  constructor(
    @repository(TodomongoautenticacaoRepository)
    public todomongoautenticacaoRepository : TodomongoautenticacaoRepository,
  ) {}


  @post('/todomongoautenticacaos')
  @response(200, {
    description: 'Todomongoautenticacao model instance',
    content: {'application/json': {schema: getModelSchemaRef(Todomongoautenticacao)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomongoautenticacao, {
            title: 'NewTodomongoautenticacao',
            exclude: ['id'],
          }),
        },
      },
    })
    todomongoautenticacao: Todomongoautenticacao,
  ): Promise<Todomongoautenticacao> {
	
	//ultimo registo da bd
	let ultimoRegisto = await this.todomongoautenticacaoRepository.findOne({order: ['id DESC']});
	
	//auto incrementacao do id
	if(ultimoRegisto!=null){
		let auxIncrementa = parseInt(''+ultimoRegisto.id,10);
		auxIncrementa=auxIncrementa+1;
		todomongoautenticacao.id=auxIncrementa;
	}
	
    return this.todomongoautenticacaoRepository.create(todomongoautenticacao);
  }

  @authenticate.skip()// <---- salta autenticacao nesta funcao
  @get('/todomongoautenticacaos/count')
  @response(200, {
    description: 'Todomongoautenticacao model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Todomongoautenticacao) where?: Where<Todomongoautenticacao>,
  ): Promise<Count> {
    return this.todomongoautenticacaoRepository.count(where);
  }

  @get('/todomongoautenticacaos')
  @response(200, {
    description: 'Array of Todomongoautenticacao model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Todomongoautenticacao, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Todomongoautenticacao) filter?: Filter<Todomongoautenticacao>,
  ): Promise<Todomongoautenticacao[]> {
    return this.todomongoautenticacaoRepository.find(filter);
  }

  @patch('/todomongoautenticacaos')
  @response(200, {
    description: 'Todomongoautenticacao PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomongoautenticacao, {partial: true}),
        },
      },
    })
    todomongoautenticacao: Todomongoautenticacao,
    @param.where(Todomongoautenticacao) where?: Where<Todomongoautenticacao>,
  ): Promise<Count> {
    return this.todomongoautenticacaoRepository.updateAll(todomongoautenticacao, where);
  }

  @get('/todomongoautenticacaos/{id}')
  @response(200, {
    description: 'Todomongoautenticacao model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Todomongoautenticacao, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Todomongoautenticacao, {exclude: 'where'}) filter?: FilterExcludingWhere<Todomongoautenticacao>
  ): Promise<Todomongoautenticacao> {
    return this.todomongoautenticacaoRepository.findById(id, filter);
  }

  @patch('/todomongoautenticacaos/{id}')
  @response(204, {
    description: 'Todomongoautenticacao PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Todomongoautenticacao, {partial: true}),
        },
      },
    })
    todomongoautenticacao: Todomongoautenticacao,
  ): Promise<void> {
    await this.todomongoautenticacaoRepository.updateById(id, todomongoautenticacao);
  }

  @put('/todomongoautenticacaos/{id}')
  @response(204, {
    description: 'Todomongoautenticacao PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() todomongoautenticacao: Todomongoautenticacao,
  ): Promise<void> {
    await this.todomongoautenticacaoRepository.replaceById(id, todomongoautenticacao);
  }

  @del('/todomongoautenticacaos/{id}')
  @response(204, {
    description: 'Todomongoautenticacao DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todomongoautenticacaoRepository.deleteById(id);
  }
}