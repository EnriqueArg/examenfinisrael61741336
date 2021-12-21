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
  Detallefactura,
  Producto,
} from '../models';
import {DetallefacturaRepository} from '../repositories';

export class DetallefacturaProductoController {
  constructor(
    @repository(DetallefacturaRepository) protected detallefacturaRepository: DetallefacturaRepository,
  ) { }

  @get('/detallefacturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Detallefactura has many Producto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Producto>,
  ): Promise<Producto[]> {
    return this.detallefacturaRepository.productos(id).find(filter);
  }

  @post('/detallefacturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Detallefactura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Producto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Detallefactura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {
            title: 'NewProductoInDetallefactura',
            exclude: ['id'],
            optional: ['detallefacturaId']
          }),
        },
      },
    }) producto: Omit<Producto, 'id'>,
  ): Promise<Producto> {
    return this.detallefacturaRepository.productos(id).create(producto);
  }

  @patch('/detallefacturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Detallefactura.Producto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Producto, {partial: true}),
        },
      },
    })
    producto: Partial<Producto>,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.detallefacturaRepository.productos(id).patch(producto, where);
  }

  @del('/detallefacturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Detallefactura.Producto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Producto)) where?: Where<Producto>,
  ): Promise<Count> {
    return this.detallefacturaRepository.productos(id).delete(where);
  }
}
