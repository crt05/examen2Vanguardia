import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  DetalleFactura,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaDetalleFacturaController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/detalle-factura', {
    responses: {
      '200': {
        description: 'DetalleFactura belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleFactura)},
          },
        },
      },
    },
  })
  async getDetalleFactura(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<DetalleFactura> {
    return this.facturaRepository.detalleFactura(id);
  }
}
