import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Factura, FacturaRelations, DetalleFactura} from '../models';
import {DetalleFacturaRepository} from './detalle-factura.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly detalleFactura: BelongsToAccessor<DetalleFactura, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DetalleFacturaRepository') protected detalleFacturaRepositoryGetter: Getter<DetalleFacturaRepository>,
  ) {
    super(Factura, dataSource);
    this.detalleFactura = this.createBelongsToAccessorFor('detalleFactura', detalleFacturaRepositoryGetter,);
    this.registerInclusionResolver('detalleFactura', this.detalleFactura.inclusionResolver);
  }
}
