/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A CategoryDTO object.
 */
export class CategoryDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
