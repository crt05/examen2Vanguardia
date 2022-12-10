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
  DetalleFactura,
  Factura,
} from '../models';
import {DetalleFacturaRepository} from '../repositories';

export class DetalleFacturaFacturaController {
  constructor(
    @repository(DetalleFacturaRepository) protected detalleFacturaRepository: DetalleFacturaRepository,
  ) { }

  @get('/detalle-facturas/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of DetalleFactura has many Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.detalleFacturaRepository.facturas(id).find(filter);
  }

  @post('/detalle-facturas/{id}/facturas', {
    responses: {
      '200': {
        description: 'DetalleFactura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DetalleFactura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInDetalleFactura',
            exclude: ['id'],
            optional: ['detalleFacturaId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.detalleFacturaRepository.facturas(id).create(factura);
  }

  @patch('/detalle-facturas/{id}/facturas', {
    responses: {
      '200': {
        description: 'DetalleFactura.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.detalleFacturaRepository.facturas(id).patch(factura, where);
  }

  @del('/detalle-facturas/{id}/facturas', {
    responses: {
      '200': {
        description: 'DetalleFactura.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.detalleFacturaRepository.facturas(id).delete(where);
  }
}
