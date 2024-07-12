import { Column, ManyToOne, Entity as TypeOrmEntity } from 'typeorm';

import { EBlocEntity } from './ebloc-entity';
import { ZoneEntity } from './zone.entity';

@TypeOrmEntity('shipping_method')
export class ShippingMethodEntity extends EBlocEntity {
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { name: 'price_calculator_code' })
  priceCalculatorCode: string;

  @Column('boolean')
  enabled: boolean;

  @ManyToOne(() => ZoneEntity, z => z.shippingMethods, { onDelete: 'CASCADE' }) // If a zone is deleted, all its shipping methods will be deleted
  zone: ZoneEntity;
}
