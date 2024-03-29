import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { Brand, IBrand } from "./brand.entity";
import { IModelResult } from "../model";



export class BrandModel extends Model<IBrand> {
  constructor(params: IModelParams) {
    super(Brand, params);
  }


  async find(query: core.Query): Promise<IModelResult<IBrand[]>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IBrand[] = await this.model.find(query).populate('owner').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IBrand>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IBrand = await this.model.findOne(query).populate('owner').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }
}