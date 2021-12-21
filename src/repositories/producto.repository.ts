import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Producto, ProductoRelations, Detallefactura} from '../models';
import {DetallefacturaRepository} from './detallefactura.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly detallefactura: BelongsToAccessor<Detallefactura, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DetallefacturaRepository') protected detallefacturaRepositoryGetter: Getter<DetallefacturaRepository>,
  ) {
    super(Producto, dataSource);
    this.detallefactura = this.createBelongsToAccessorFor('detallefactura', detallefacturaRepositoryGetter,);
    this.registerInclusionResolver('detallefactura', this.detallefactura.inclusionResolver);
  }
}
