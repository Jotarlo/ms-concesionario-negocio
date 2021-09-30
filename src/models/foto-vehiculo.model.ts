import {Entity, model, property} from '@loopback/repository';

@model()
export class FotoVehiculo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  id_vehiculo?: number;

  constructor(data?: Partial<FotoVehiculo>) {
    super(data);
  }
}

export interface FotoVehiculoRelations {
  // describe navigational properties here
}

export type FotoVehiculoWithRelations = FotoVehiculo & FotoVehiculoRelations;
