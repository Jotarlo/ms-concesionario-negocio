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
  Marca,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoMarcaController {
  constructor(
    @repository(VehiculoRepository)
    public vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/marca', {
    responses: {
      '200': {
        description: 'Marca belonging to Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Marca)},
          },
        },
      },
    },
  })
  async getMarca(
    @param.path.number('id') id: typeof Vehiculo.prototype.id,
  ): Promise<Marca> {
    return this.vehiculoRepository.marca(id);
  }
}
