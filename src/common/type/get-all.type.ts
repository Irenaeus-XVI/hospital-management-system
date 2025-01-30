import { PopulateOptions } from 'mongoose';
import { SortOrder } from '../constants';

export type GetAll = {
  limit?: number;
  skip?: number;
  page?:number;
  paginate?: boolean;
  sort?: string;
  order?: SortOrder;
  fields?: string;
  lean?: boolean;
  populate?: PopulateOptions | (string | PopulateOptions)[];
};
