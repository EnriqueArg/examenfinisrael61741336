import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Producto,
  Detallefactura,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetallefacturaController {
  constructor(
    @repository(ProductoRepository)
    public productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detallefactura', {
    responses: {
      '200': {
        description: 'Detallefactura belonging to Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Detallefactura)},
          },
        },
      },
    },
  })
  async getDetallefactura(
    @param.path.string('id') id: typeof Producto.prototype.id,
  ): Promise<Detallefactura> {
    return this.productoRepository.detallefactura(id);
  }
}
