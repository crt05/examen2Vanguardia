import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Productos} from './productos.model';
import {Factura} from './factura.model';

@model()
export class DetalleFactura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  facturaId: string;

  @property({
    type: 'string',
    required: true,
  })
  productoId: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @belongsTo(() => Productos)
  productosId: string;

  @hasMany(() => Factura)
  facturas: Factura[];

  constructor(data?: Partial<DetalleFactura>) {
    super(data);
  }
}

export interface DetalleFacturaRelations {
  // describe navigational properties here
}

export type DetalleFacturaWithRelations = DetalleFactura & DetalleFacturaRelations;
