import Pack from "../interfaces/pakc.interface";
import PackModel from "../models/pack.model";

export default class PackService {
  constructor(
    private packModel = new PackModel(),
  ) { }

  async create(obj: Pack): Promise<Partial<Pack> | null> {
    try {
      await this.packModel.create(obj);

      return obj;
    }
    catch (err) {
      return null;
    }
  }

  async list(): Promise<Partial<Pack>[] | null> {
    try {
      const result = await this.packModel.list();

      return result;
    }
    catch (err) {
      return null;
    }
  }

  async find(id: number): Promise<Partial<Pack> | string | null> {
    try {
      const product = await this.packModel.find(id);

      if (product === null) {
        return 'invalid';
      }

      return product;
    }
    catch (err) {
      return null;
    }
  }

  async update(id: number, obj: Pack): Promise<Partial<Pack> | string | null> {
    try {
      const product = await this.find(id);

      if (product === null) {
        return 'invalid';
      }

      await this.packModel.update(id, obj);

      return obj;
    }
    catch (err) {
      return null;
    }
  }

  async delete(id: number): Promise<string | null> {
    try {
      const product = await this.find(id);

      if (product === null) {
        return 'invalid';
      }

      await this.packModel.delete(id);

      return 'success';
    }
    catch (err) {
      return null;
    }
  }
}