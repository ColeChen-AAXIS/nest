import dayjs from 'dayjs';
import { IPet } from 'app/shared/model/pet.model';
import { IUser } from 'app/shared/model/user.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: number;
  quantity?: number | null;
  shipDate?: string | null;
  status?: OrderStatus | null;
  complete?: boolean | null;
  petId?: IPet | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IOrder> = {
  complete: false,
};
