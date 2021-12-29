/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Pet } from './pet.entity';

/**
 * A Url.
 */
@Entity('url')
export class Url extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @ManyToOne(type => Pet)
    pet: Pet;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
