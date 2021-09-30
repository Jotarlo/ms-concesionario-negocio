import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Vehiculo,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaVehiculoController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Vehiculo belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async getVehiculo(
    @param.path.number('id') id: typeof Venta.prototype.id,
  ): Promise<Vehiculo> {
    return this.ventaRepository.vehiculo(id);
  }
}
