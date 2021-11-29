import { IPet } from 'app/shared/model/pet.model';

export interface IUrl {
  id?: number;
  name?: string | null;
  pet?: IPet | null;
}

export const defaultValue: Readonly<IUrl> = {};
