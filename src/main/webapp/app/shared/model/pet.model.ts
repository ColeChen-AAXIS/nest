import { ICategory } from 'app/shared/model/category.model';
import { IUrl } from 'app/shared/model/url.model';
import { ITag } from 'app/shared/model/tag.model';
import { PetStatus } from 'app/shared/model/enumerations/pet-status.model';

export interface IPet {
  id?: number;
  name?: string | null;
  status?: PetStatus | null;
  category?: ICategory | null;
  photoUrls?: IUrl[] | null;
  tags?: ITag[] | null;
}

export const defaultValue: Readonly<IPet> = {};
