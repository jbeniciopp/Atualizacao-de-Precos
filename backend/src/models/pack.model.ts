import { RowDataPacket } from 'mysql2';
import conn from "./connection";
import Model from "../interfaces/model.interface";
import Pack from '../interfaces/pakc.interface';
const DATABASE = 'Atualizacao_de_Precos'

export default class PackModel implements Model<Pack> {
  constructor(
    private tableName: string = 'packs', 
    private connection = conn
  ) { }
  
  async create(obj: Pack): Promise<void> {
    await this.connection.execute(
      `INSERT INTO ${DATABASE}.${this.tableName}(
        pack_id, product_id, qty
      ) VALUES (?, ?, ?);`,
      [ obj.packId, obj.productId, obj.qty ]
    );
  }

  async list(): Promise<Partial<Pack>[]> {
    const result = await this.connection.execute(
      `SELECT
      ${DATABASE}.${this.tableName}.id,
      ${DATABASE}.${this.tableName}.pack_id AS packId,
      ${DATABASE}.${this.tableName}.product_id AS productId,
      ${DATABASE}.${this.tableName}.qty
      FROM ${DATABASE}.${this.tableName};`
    );
    const [ products ] = result;
    return products as Pack[];
  }

  async find(id: number): Promise<Partial<Pack> | null> {
    const result = await this.connection.execute(
      `SELECT
      ${DATABASE}.${this.tableName}.id,
      ${DATABASE}.${this.tableName}.pack_id AS packId,
      ${DATABASE}.${this.tableName}.product_id AS productId,
      ${DATABASE}.${this.tableName}.qty
      FROM ${DATABASE}.${this.tableName} WHERE id = ?;`, [ id ]
    );
    const [ products ] = result as RowDataPacket[];
    return products[ 0 ] as Pack;
  }

  async update(id: number, obj: Pack): Promise<void> {
    await this.connection.execute(
      `UPDATE ${DATABASE}.${this.tableName}
      SET pack_id = ?, product_id = ?, qty = ?
      WHERE id = ?;`,
      [ obj.packId, obj.productId, obj.qty, id ]
    );
  }

  async delete(id: number): Promise<void> {
    await this.connection.execute(
      `DELETE FROM ${DATABASE}.${this.tableName}
      WHERE id = ?;`,
      [id],
    );
  }
}