import { IPet } from 'app/shared/model/pet.model';

export interface ITag {
  id?: number;
  name?: string | null;
  pet?: IPet | null;
}

export const defaultValue: Readonly<ITag> = {};
