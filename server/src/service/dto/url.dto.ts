/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { PetDTO } from './pet.dto';

/**
 * A UrlDTO object.
 */
export class UrlDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ type: PetDTO, description: 'pet relationship' })
    pet: PetDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
