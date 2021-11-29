/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { CategoryDTO } from './category.dto';
import { UrlDTO } from './url.dto';
import { TagDTO } from './tag.dto';
import { PetStatus } from '../../domain/enumeration/pet-status';

/**
 * A PetDTO object.
 */
export class PetDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ enum: PetStatus, description: 'status enum field', required: false })
    status: PetStatus;

    @ApiModelProperty({ type: CategoryDTO, description: 'category relationship' })
    category: CategoryDTO;

    @ApiModelProperty({ type: UrlDTO, isArray: true, description: 'photoUrls relationship' })
    photoUrls: UrlDTO[];

    @ApiModelProperty({ type: TagDTO, isArray: true, description: 'tags relationship' })
    tags: TagDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
