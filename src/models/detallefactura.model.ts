import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Factura} from './factura.model';
import {Producto} from './producto.model';

@model()
export class Detallefactura extends Entity {
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
  facturaid: string;

  @property({
    type: 'string',
    required: true,
  })
  productotold: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @belongsTo(() => Factura)
  facturaId: string;

  @hasMany(() => Producto)
  productos: Producto[];

  constructor(data?: Partial<Detallefactura>) {
    super(data);
  }
}

export interface DetallefacturaRelations {
  // describe navigational properties here
}

export type DetallefacturaWithRelations = Detallefactura & DetallefacturaRelations;
