import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Detallefactura} from '../models';
import {DetallefacturaRepository} from '../repositories';

export class DetallefacturaController {
  constructor(
    @repository(DetallefacturaRepository)
    public detallefacturaRepository : DetallefacturaRepository,
  ) {}

  @post('/detallefacturas')
  @response(200, {
    description: 'Detallefactura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Detallefactura)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallefactura, {
            title: 'NewDetallefactura',
            exclude: ['id'],
          }),
        },
      },
    })
    detallefactura: Omit<Detallefactura, 'id'>,
  ): Promise<Detallefactura> {
    return this.detallefacturaRepository.create(detallefactura);
  }

  @get('/detallefacturas/count')
  @response(200, {
    description: 'Detallefactura model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Detallefactura) where?: Where<Detallefactura>,
  ): Promise<Count> {
    return this.detallefacturaRepository.count(where);
  }

  @get('/detallefacturas')
  @response(200, {
    description: 'Array of Detallefactura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Detallefactura, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Detallefactura) filter?: Filter<Detallefactura>,
  ): Promise<Detallefactura[]> {
    return this.detallefacturaRepository.find(filter);
  }

  @patch('/detallefacturas')
  @response(200, {
    description: 'Detallefactura PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallefactura, {partial: true}),
        },
      },
    })
    detallefactura: Detallefactura,
    @param.where(Detallefactura) where?: Where<Detallefactura>,
  ): Promise<Count> {
    return this.detallefacturaRepository.updateAll(detallefactura, where);
  }

  @get('/detallefacturas/{id}')
  @response(200, {
    description: 'Detallefactura model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Detallefactura, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Detallefactura, {exclude: 'where'}) filter?: FilterExcludingWhere<Detallefactura>
  ): Promise<Detallefactura> {
    return this.detallefacturaRepository.findById(id, filter);
  }

  @patch('/detallefacturas/{id}')
  @response(204, {
    description: 'Detallefactura PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallefactura, {partial: true}),
        },
      },
    })
    detallefactura: Detallefactura,
  ): Promise<void> {
    await this.detallefacturaRepository.updateById(id, detallefactura);
  }

  @put('/detallefacturas/{id}')
  @response(204, {
    description: 'Detallefactura PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detallefactura: Detallefactura,
  ): Promise<void> {
    await this.detallefacturaRepository.replaceById(id, detallefactura);
  }

  @del('/detallefacturas/{id}')
  @response(204, {
    description: 'Detallefactura DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detallefacturaRepository.deleteById(id);
  }
}
