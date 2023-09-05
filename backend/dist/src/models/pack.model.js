"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("./connection"));
const DATABASE = 'Atualizacao_de_Precos';
class PackModel {
    constructor(tableName = 'packs', connection = connection_1.default) {
        this.tableName = tableName;
        this.connection = connection;
    }
    create(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute(`INSERT INTO ${DATABASE}.${this.tableName}(
        pack_id, product_id, qty
      ) VALUES (?, ?, ?);`, [obj.packId, obj.productId, obj.qty]);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute(`SELECT
      ${DATABASE}.${this.tableName}.id,
      ${DATABASE}.${this.tableName}.pack_id AS packId,
      ${DATABASE}.${this.tableName}.product_id AS productId,
      ${DATABASE}.${this.tableName}.qty
      FROM ${DATABASE}.${this.tableName};`);
            const [products] = result;
            return products;
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.connection.execute(`SELECT
      ${DATABASE}.${this.tableName}.id,
      ${DATABASE}.${this.tableName}.pack_id AS packId,
      ${DATABASE}.${this.tableName}.product_id AS productId,
      ${DATABASE}.${this.tableName}.qty
      FROM ${DATABASE}.${this.tableName} WHERE id = ?;`, [id]);
            const [products] = result;
            return products[0];
        });
    }
    update(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute(`UPDATE ${DATABASE}.${this.tableName}
      SET pack_id = ?, product_id = ?, qty = ?
      WHERE id = ?;`, [obj.packId, obj.productId, obj.qty, id]);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.execute(`DELETE FROM ${DATABASE}.${this.tableName}
      WHERE id = ?;`, [id]);
        });
    }
}
exports.default = PackModel;
