import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetalleFactura,
  Productos,
} from '../models';
import {DetalleFacturaRepository} from '../repositories';

export class DetalleFacturaProductosController {
  constructor(
    @repository(DetalleFacturaRepository)
    public detalleFacturaRepository: DetalleFacturaRepository,
  ) { }

  @get('/detalle-facturas/{id}/productos', {
    responses: {
      '200': {
        description: 'Productos belonging to DetalleFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async getProductos(
    @param.path.string('id') id: typeof DetalleFactura.prototype.id,
  ): Promise<Productos> {
    return this.detalleFacturaRepository.productos(id);
  }
}
