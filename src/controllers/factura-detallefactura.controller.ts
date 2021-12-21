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
  Factura,
  Detallefactura,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaDetallefacturaController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/detallefacturas', {
    responses: {
      '200': {
        description: 'Array of Factura has many Detallefactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Detallefactura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Detallefactura>,
  ): Promise<Detallefactura[]> {
    return this.facturaRepository.detallefacturas(id).find(filter);
  }

  @post('/facturas/{id}/detallefacturas', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detallefactura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallefactura, {
            title: 'NewDetallefacturaInFactura',
            exclude: ['id'],
            optional: ['facturaId']
          }),
        },
      },
    }) detallefactura: Omit<Detallefactura, 'id'>,
  ): Promise<Detallefactura> {
    return this.facturaRepository.detallefacturas(id).create(detallefactura);
  }

  @patch('/facturas/{id}/detallefacturas', {
    responses: {
      '200': {
        description: 'Factura.Detallefactura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallefactura, {partial: true}),
        },
      },
    })
    detallefactura: Partial<Detallefactura>,
    @param.query.object('where', getWhereSchemaFor(Detallefactura)) where?: Where<Detallefactura>,
  ): Promise<Count> {
    return this.facturaRepository.detallefacturas(id).patch(detallefactura, where);
  }

  @del('/facturas/{id}/detallefacturas', {
    responses: {
      '200': {
        description: 'Factura.Detallefactura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detallefactura)) where?: Where<Detallefactura>,
  ): Promise<Count> {
    return this.facturaRepository.detallefacturas(id).delete(where);
  }
}
