import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vendedor,
  UsuarioVendedor,
} from '../models';
import {VendedorRepository} from '../repositories';

export class VendedorUsuarioVendedorController {
  constructor(
    @repository(VendedorRepository) protected vendedorRepository: VendedorRepository,
  ) { }

  @get('/vendedors/{id}/usuario-vendedor', {
    responses: {
      '200': {
        description: 'Vendedor has one UsuarioVendedor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UsuarioVendedor),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<UsuarioVendedor>,
  ): Promise<UsuarioVendedor> {
    return this.vendedorRepository.usuarioVendedor(id).get(filter);
  }

  @post('/vendedors/{id}/usuario-vendedor', {
    responses: {
      '200': {
        description: 'Vendedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(UsuarioVendedor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vendedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioVendedor, {
            title: 'NewUsuarioVendedorInVendedor',
            exclude: ['id'],
            optional: ['id_vendedor']
          }),
        },
      },
    }) usuarioVendedor: Omit<UsuarioVendedor, 'id'>,
  ): Promise<UsuarioVendedor> {
    return this.vendedorRepository.usuarioVendedor(id).create(usuarioVendedor);
  }

  @patch('/vendedors/{id}/usuario-vendedor', {
    responses: {
      '200': {
        description: 'Vendedor.UsuarioVendedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioVendedor, {partial: true}),
        },
      },
    })
    usuarioVendedor: Partial<UsuarioVendedor>,
    @param.query.object('where', getWhereSchemaFor(UsuarioVendedor)) where?: Where<UsuarioVendedor>,
  ): Promise<Count> {
    return this.vendedorRepository.usuarioVendedor(id).patch(usuarioVendedor, where);
  }

  @del('/vendedors/{id}/usuario-vendedor', {
    responses: {
      '200': {
        description: 'Vendedor.UsuarioVendedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(UsuarioVendedor)) where?: Where<UsuarioVendedor>,
  ): Promise<Count> {
    return this.vendedorRepository.usuarioVendedor(id).delete(where);
  }
}
