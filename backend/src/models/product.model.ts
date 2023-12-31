import { RowDataPacket } from 'mysql2';
import conn from "./connection";
import Model from "../interfaces/model.interface";
import Product from "../interfaces/product.interface";
const DATABASE = 'Atualizacao_de_Precos';

export default class ProductModel implements Model<Product> {
  constructor(
    private tableName: string = 'products', 
    private connection = conn
  ) { }
  
  async create(obj: Product): Promise<void> {
    await this.connection.execute(
      `INSERT INTO ${DATABASE}.${this.tableName}(
        code, name, cost_price, sales_price
      ) VALUES (?, ?, ?, ?);`,
      [ obj.code, obj.name, obj.costPrice, obj.salesPrice ]
    );
  }

  async list(): Promise<Partial<Product>[]> {
    const result = await this.connection.execute(
      `SELECT
      ${DATABASE}.${this.tableName}.code,
      ${DATABASE}.${this.tableName}.name,
      ${DATABASE}.${this.tableName}.cost_price AS costPrice,
      ${DATABASE}.${this.tableName}.sales_price AS salesPrice
      FROM ${DATABASE}.${this.tableName};`
    );
    const [ products ] = result;
    return products as Product[];
  }

  async find(id: number): Promise<Partial<Product> | null> {
    const result = await this.connection.execute(
      `SELECT
      ${DATABASE}.${this.tableName}.code,
      ${DATABASE}.${this.tableName}.name,
      ${DATABASE}.${this.tableName}.cost_price AS costPrice,
      ${DATABASE}.${this.tableName}.sales_price AS salesPrice
      FROM ${DATABASE}.${this.tableName} WHERE code = ?;`, [ id ]
    );
    const [ products ] = result as RowDataPacket[];
    return products[ 0 ] as Product;
  }

  async update(id: number, obj: Product): Promise<void> {
    await this.connection.execute(
      `UPDATE ${DATABASE}.${this.tableName}
      SET code = ?, name = ?, cost_price = ?, sales_price = ?
      WHERE code = ?;`,
      [ obj.code, obj.name, obj.costPrice, obj.salesPrice, id ]
    );
  }

  async delete(id: number): Promise<void> {
    await this.connection.execute(
      `DELETE FROM ${DATABASE}.${this.tableName}
      WHERE code = ?;`,
      [id],
    );
  }
}