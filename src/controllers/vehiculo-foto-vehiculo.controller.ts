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
  Vehiculo,
  FotoVehiculo,
} from '../models';
import {VehiculoRepository} from '../repositories';

export class VehiculoFotoVehiculoController {
  constructor(
    @repository(VehiculoRepository) protected vehiculoRepository: VehiculoRepository,
  ) { }

  @get('/vehiculos/{id}/foto-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Vehiculo has many FotoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FotoVehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<FotoVehiculo>,
  ): Promise<FotoVehiculo[]> {
    return this.vehiculoRepository.fotos(id).find(filter);
  }

  @post('/vehiculos/{id}/foto-vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculo model instance',
        content: {'application/json': {schema: getModelSchemaRef(FotoVehiculo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Vehiculo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoVehiculo, {
            title: 'NewFotoVehiculoInVehiculo',
            exclude: ['id'],
            optional: ['id_vehiculo']
          }),
        },
      },
    }) fotoVehiculo: Omit<FotoVehiculo, 'id'>,
  ): Promise<FotoVehiculo> {
    return this.vehiculoRepository.fotos(id).create(fotoVehiculo);
  }

  @patch('/vehiculos/{id}/foto-vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculo.FotoVehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FotoVehiculo, {partial: true}),
        },
      },
    })
    fotoVehiculo: Partial<FotoVehiculo>,
    @param.query.object('where', getWhereSchemaFor(FotoVehiculo)) where?: Where<FotoVehiculo>,
  ): Promise<Count> {
    return this.vehiculoRepository.fotos(id).patch(fotoVehiculo, where);
  }

  @del('/vehiculos/{id}/foto-vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculo.FotoVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(FotoVehiculo)) where?: Where<FotoVehiculo>,
  ): Promise<Count> {
    return this.vehiculoRepository.fotos(id).delete(where);
  }
}
