/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Pet } from './pet.entity';
import { OrderStatus } from './enumeration/order-status';

import { User } from './user.entity';

/**
 * A Order.
 */
@Entity('jhi_order')
export class Order extends BaseEntity {
    @Column({ type: 'integer', name: 'quantity', nullable: true })
    quantity: number;

    @Column({ type: 'datetime', name: 'ship_date', nullable: true })
    shipDate: any;

    @Column({ type: 'simple-enum', name: 'status', enum: OrderStatus })
    status: OrderStatus;

    @Column({ type: 'boolean', name: 'complete', nullable: true })
    complete: boolean;

    @OneToOne(type => Pet)
    @JoinColumn()
    petId: Pet;

    @ManyToOne(type => User)
    user: User;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
