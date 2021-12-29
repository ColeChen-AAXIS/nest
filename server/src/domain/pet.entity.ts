/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Category } from './category.entity';
import { Url } from './url.entity';
import { Tag } from './tag.entity';
import { PetStatus } from './enumeration/pet-status';

/**
 * A Pet.
 */
@Entity('pet')
export class Pet extends BaseEntity {
    @Column({ name: 'name', nullable: true })
    name: string;

    @Column({ type: 'simple-enum', name: 'status', enum: PetStatus })
    status: PetStatus;

    @ManyToOne(type => Category)
    category: Category;

    @OneToMany(
        type => Url,
        other => other.pet,
    )
    photoUrls: Url[];

    @ManyToMany(
        type => Tag,
        other => other.pets,
    )
    @JoinTable()
    tags: Tag[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
