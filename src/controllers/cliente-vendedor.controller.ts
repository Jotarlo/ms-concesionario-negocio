import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cliente,
  Vendedor,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteVendedorController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/vendedor', {
    responses: {
      '200': {
        description: 'Vendedor belonging to Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vendedor)},
          },
        },
      },
    },
  })
  async getVendedor(
    @param.path.number('id') id: typeof Cliente.prototype.id,
  ): Promise<Vendedor> {
    return this.clienteRepository.vendedor(id);
  }
}
