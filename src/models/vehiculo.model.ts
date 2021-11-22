import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {CategoriaVehiculo} from './categoria-vehiculo.model';
import {Categoria} from './categoria.model';
import {FotoVehiculo} from './foto-vehiculo.model';
import {Marca} from './marca.model';
import {Proveedor} from './proveedor.model';

@model()
export class Vehiculo extends Entity {
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
  color: string;

  @property({
    type: 'number',
    required: true,
  })
  modelo: number;

  @property({
    type: 'string',
    required: true,
  })
  serie_chasis: string;

  @property({
    type: 'string',
    required: true,
  })
  serie_motor: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    default: 0,
  })
  descuento?: number;

  @property({
    type: 'number',
    default: 1,
  })
  estado?: number;

  @property({
    type: 'string',
    required: true,
  })
  foto_principal: string;

  @belongsTo(() => Marca, {name: 'marca'})
  id_marca: number;

  @hasMany(() => Categoria, {through: {model: () => CategoriaVehiculo, keyFrom: 'id_vehiculo', keyTo: 'id_categoria'}})
  categorias: Categoria[];

  @hasMany(() => FotoVehiculo, {keyTo: 'id_vehiculo'})
  fotos: FotoVehiculo[];

  @belongsTo(() => Proveedor, {name: 'proveedor'})
  id_proveedor: number;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
