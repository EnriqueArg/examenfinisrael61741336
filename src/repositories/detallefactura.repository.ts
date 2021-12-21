import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Detallefactura, DetallefacturaRelations, Factura, Producto} from '../models';
import {FacturaRepository} from './factura.repository';
import {ProductoRepository} from './producto.repository';

export class DetallefacturaRepository extends DefaultCrudRepository<
  Detallefactura,
  typeof Detallefactura.prototype.id,
  DetallefacturaRelations
> {

  public readonly factura: BelongsToAccessor<Factura, typeof Detallefactura.prototype.id>;

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Detallefactura.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Detallefactura, dataSource);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
