import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {FotoVehiculo, FotoVehiculoRelations} from '../models';

export class FotoVehiculoRepository extends DefaultCrudRepository<
  FotoVehiculo,
  typeof FotoVehiculo.prototype.id,
  FotoVehiculoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FotoVehiculo, dataSource);
  }
}
