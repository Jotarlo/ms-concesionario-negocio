import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {UsuarioVendedor} from './usuario-vendedor.model';
import {Cliente} from './cliente.model';
import {Venta} from './venta.model';

@model()
export class Vendedor extends Entity {
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
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @hasOne(() => UsuarioVendedor, {keyTo: 'id_vendedor'})
  usuarioVendedor: UsuarioVendedor;

  @hasMany(() => Cliente, {keyTo: 'id_vendedor'})
  clientes: Cliente[];

  @hasMany(() => Venta, {keyTo: 'id_vendedor'})
  ventas: Venta[];

  constructor(data?: Partial<Vendedor>) {
    super(data);
  }
}

export interface VendedorRelations {
  // describe navigational properties here
}

export type VendedorWithRelations = Vendedor & VendedorRelations;
