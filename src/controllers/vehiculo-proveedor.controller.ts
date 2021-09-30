import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Vehiculo,
  Proveedor,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoProveedorController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.number('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Proveedor> {
    return this.vehiculoRepository.proveedor(id);
  }
}
