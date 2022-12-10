import {Entity, model, property, belongsTo} from '@loopback/repository';
import {DetalleFactura} from './detalle-factura.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  correlativo: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  cliente: string;

  @property({
    type: 'string',
    default: "SPS",
  })
  direccion?: string;

  @property({
    type: 'string',
    default: 1111 - 1111,
  })
  telefono?: string;

  @property({
    type: 'string',
    default: "N/A",
  })
  email?: string;

  @belongsTo(() => DetalleFactura)
  detalleFacturaId: string;

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
