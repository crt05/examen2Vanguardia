import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Productos, ProductosRelations, DetalleFactura} from '../models';
import {DetalleFacturaRepository} from './detalle-factura.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {

  public readonly detalleFacturas: HasManyRepositoryFactory<DetalleFactura, typeof Productos.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DetalleFacturaRepository') protected detalleFacturaRepositoryGetter: Getter<DetalleFacturaRepository>,
  ) {
    super(Productos, dataSource);
    this.detalleFacturas = this.createHasManyRepositoryFactoryFor('detalleFacturas', detalleFacturaRepositoryGetter,);
    this.registerInclusionResolver('detalleFacturas', this.detalleFacturas.inclusionResolver);
  }
}
