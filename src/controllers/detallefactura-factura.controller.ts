import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Detallefactura,
  Factura,
} from '../models';
import {DetallefacturaRepository} from '../repositories';

export class DetallefacturaFacturaController {
  constructor(
    @repository(DetallefacturaRepository)
    public detallefacturaRepository: DetallefacturaRepository,
  ) { }

  @get('/detallefacturas/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to Detallefactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof Detallefactura.prototype.id,
  ): Promise<Factura> {
    return this.detallefacturaRepository.factura(id);
  }
}
