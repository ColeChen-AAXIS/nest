/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { PetDTO } from './pet.dto';
import { OrderStatus } from '../../domain/enumeration/order-status';

import { UserDTO } from './user.dto';

/**
 * A OrderDTO object.
 */
export class OrderDTO extends BaseDTO {
    @ApiModelProperty({ description: 'quantity field', required: false })
    quantity: number;

    @ApiModelProperty({ description: 'shipDate field', required: false })
    shipDate: any;

    @ApiModelProperty({ enum: OrderStatus, description: 'status enum field', required: false })
    status: OrderStatus;

    @ApiModelProperty({ description: 'complete field', required: false })
    complete: boolean;

    @ApiModelProperty({ type: PetDTO, description: 'petId relationship' })
    petId: PetDTO;

    @ApiModelProperty({ type: UserDTO, description: 'user relationship' })
    user: UserDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
