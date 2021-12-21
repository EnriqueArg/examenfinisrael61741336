import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Factura, FacturaRelations, Detallefactura} from '../models';
import {DetallefacturaRepository} from './detallefactura.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly detallefacturas: HasManyRepositoryFactory<Detallefactura, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DetallefacturaRepository') protected detallefacturaRepositoryGetter: Getter<DetallefacturaRepository>,
  ) {
    super(Factura, dataSource);
    this.detallefacturas = this.createHasManyRepositoryFactoryFor('detallefacturas', detallefacturaRepositoryGetter,);
    this.registerInclusionResolver('detallefacturas', this.detallefacturas.inclusionResolver);
  }
}
