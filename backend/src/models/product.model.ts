import { RowDataPacket } from 'mysql2';
import conn from "./connection";
import Model from "../interfaces/model.interface";
import Product from "../interfaces/product.interface";
const DATABASE = 'Atualizacao_de_Precos'

export default class ProductModel implements Model<Product> {
  constructor(private tableName: string = 'products', 
  private connection = conn) { }
  
  async create(obj: Product): Promise<void> {
    await this.connection.execute(
      `INSERT INTO ${DATABASE}.${this.tableName}(
        name, cost_price, sales_price
      ) VALUES (?, ?, ?);`,
      [ obj.name, obj.costPrice, obj.salesPrice ]
    );
  }

  async list(): Promise<Partial<Product>[]> {
    const result = await this.connection.execute(
      `SELECT *
      FROM ${DATABASE}.${this.tableName};`
    );
    const [ products ] = result;
    return products as Product[];
  }

  async find(id: number): Promise<Partial<Product> | null> {
    const result = await this.connection.execute(
      `SELECT *
      FROM ${DATABASE}.${this.tableName} as C WHERE C.id = ?;`, [ id ]
    );
    const [ products ] = result as RowDataPacket[];
    return products[ 0 ] as Product;
  }

  async update(id: number, obj: Product): Promise<void> {
    await this.connection.execute(
      `UPDATE products
      SET name = ?
      SET cost_price = ?
      SET sales_price = ?
      WHERE code = ?;`,
      [ obj.name, obj.costPrice, obj.salesPrice, id ]
    );
  }

  async delete(id: number): Promise<void> {
    await this.connection.execute(
      `DELETE FROM products
      WHERE id = ?;`,
      [id],
    );
  }
}