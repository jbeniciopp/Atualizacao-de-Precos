import Product from "../interfaces/product.interface";
import ProductModel from "../models/product.model";

export default class ProductService {
  constructor(
    private productModel = new ProductModel(),
  ) { }

  async create(obj: Product): Promise<Partial<Product> | null> {
    try {
      await this.productModel.create(obj);

      return obj;
    }
    catch (err) {
      return null;
    }
  }

  async list(): Promise<Partial<Product>[] | null> {
    try {
      const result = await this.productModel.list();

      return result;
    }
    catch (err) {
      return null;
    }
  }

  async find(id: number): Promise<Partial<Product> | string | null> {
    try {
      const product = await this.productModel.find(id);

      if (product === null) {
        return 'invalid';
      }

      return product;
    }
    catch (err) {
      return null;
    }
  }

  async update(id: number, obj: Product): Promise<Partial<Product> | string | null> {
    try {
      const product = await this.find(id);

      if (product === null) {
        return 'invalid';
      }

      await this.productModel.update(id, obj);

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

      await this.productModel.delete(id);

      return 'success';
    }
    catch (err) {
      return null;
    }
  }
}