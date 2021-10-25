import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Marca} from '../models';
import {MarcaRepository} from '../repositories';

@authenticate("admin")
export class MarcaController {
  constructor(
    @repository(MarcaRepository)
    public marcaRepository: MarcaRepository,
  ) { }

  @post('/marcas')
  @response(200, {
    description: 'Marca model instance',
    content: {'application/json': {schema: getModelSchemaRef(Marca)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {
            title: 'NewMarca',
            exclude: ['id'],
          }),
        },
      },
    })
    marca: Omit<Marca, 'id'>,
  ): Promise<Marca> {
    return this.marcaRepository.create(marca);
  }

  @authenticate.skip()
  @get('/marcas/count')
  @response(200, {
    description: 'Marca model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Marca) where?: Where<Marca>,
  ): Promise<Count> {
    return this.marcaRepository.count(where);
  }

  @authenticate.skip()
  @get('/marcas')
  @response(200, {
    description: 'Array of Marca model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Marca, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Marca) filter?: Filter<Marca>,
  ): Promise<Marca[]> {
    return this.marcaRepository.find(filter);
  }

  @patch('/marcas')
  @response(200, {
    description: 'Marca PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {partial: true}),
        },
      },
    })
    marca: Marca,
    @param.where(Marca) where?: Where<Marca>,
  ): Promise<Count> {
    return this.marcaRepository.updateAll(marca, where);
  }

  @get('/marcas/{id}')
  @response(200, {
    description: 'Marca model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Marca, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Marca, {exclude: 'where'}) filter?: FilterExcludingWhere<Marca>
  ): Promise<Marca> {
    return this.marcaRepository.findById(id, filter);
  }

  @patch('/marcas/{id}')
  @response(204, {
    description: 'Marca PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {partial: true}),
        },
      },
    })
    marca: Marca,
  ): Promise<void> {
    await this.marcaRepository.updateById(id, marca);
  }

  @put('/marcas/{id}')
  @response(204, {
    description: 'Marca PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() marca: Marca,
  ): Promise<void> {
    await this.marcaRepository.replaceById(id, marca);
  }

  @del('/marcas/{id}')
  @response(204, {
    description: 'Marca DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.marcaRepository.deleteById(id);
  }
}
