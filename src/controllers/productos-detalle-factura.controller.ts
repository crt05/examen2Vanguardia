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
  Productos,
  DetalleFactura,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosDetalleFacturaController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Array of Productos has many DetalleFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleFactura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetalleFactura>,
  ): Promise<DetalleFactura[]> {
    return this.productosRepository.detalleFacturas(id).find(filter);
  }

  @post('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleFactura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Productos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFactura, {
            title: 'NewDetalleFacturaInProductos',
            exclude: ['id'],
            optional: ['productosId']
          }),
        },
      },
    }) detalleFactura: Omit<DetalleFactura, 'id'>,
  ): Promise<DetalleFactura> {
    return this.productosRepository.detalleFacturas(id).create(detalleFactura);
  }

  @patch('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Productos.DetalleFactura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFactura, {partial: true}),
        },
      },
    })
    detalleFactura: Partial<DetalleFactura>,
    @param.query.object('where', getWhereSchemaFor(DetalleFactura)) where?: Where<DetalleFactura>,
  ): Promise<Count> {
    return this.productosRepository.detalleFacturas(id).patch(detalleFactura, where);
  }

  @del('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Productos.DetalleFactura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleFactura)) where?: Where<DetalleFactura>,
  ): Promise<Count> {
    return this.productosRepository.detalleFacturas(id).delete(where);
  }
}
