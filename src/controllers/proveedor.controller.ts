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
import {Proveedor} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorController {
  constructor(
    @repository(ProveedorRepository)
    public proveedorRepository : ProveedorRepository,
  ) {}

  @post('/proveedors')
  @response(200, {
    description: 'Proveedor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedor',
            exclude: ['id'],
          }),
        },
      },
    })
    proveedor: Omit<Proveedor, 'id'>,
  ): Promise<Proveedor> {
    return this.proveedorRepository.create(proveedor);
  }

  @get('/proveedors/count')
  @response(200, {
    description: 'Proveedor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.count(where);
  }

  @get('/proveedors')
  @response(200, {
    description: 'Array of Proveedor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Proveedor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Proveedor) filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.proveedorRepository.find(filter);
  }

  @patch('/proveedors')
  @response(200, {
    description: 'Proveedor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
    @param.where(Proveedor) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.proveedorRepository.updateAll(proveedor, where);
  }

  @get('/proveedors/{id}')
  @response(200, {
    description: 'Proveedor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Proveedor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Proveedor, {exclude: 'where'}) filter?: FilterExcludingWhere<Proveedor>
  ): Promise<Proveedor> {
    return this.proveedorRepository.findById(id, filter);
  }

  @patch('/proveedors/{id}')
  @response(204, {
    description: 'Proveedor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.updateById(id, proveedor);
  }

  @put('/proveedors/{id}')
  @response(204, {
    description: 'Proveedor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() proveedor: Proveedor,
  ): Promise<void> {
    await this.proveedorRepository.replaceById(id, proveedor);
  }

  @del('/proveedors/{id}')
  @response(204, {
    description: 'Proveedor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.proveedorRepository.deleteById(id);
  }
}
