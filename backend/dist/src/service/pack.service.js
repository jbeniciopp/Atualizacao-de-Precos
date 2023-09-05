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
const pack_model_1 = __importDefault(require("../models/pack.model"));
class PackService {
    constructor(packModel = new pack_model_1.default()) {
        this.packModel = packModel;
    }
    create(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.packModel.create(obj);
                return obj;
            }
            catch (err) {
                return null;
            }
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.packModel.list();
                return result;
            }
            catch (err) {
                return null;
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.packModel.find(id);
                if (product === null) {
                    return 'invalid';
                }
                return product;
            }
            catch (err) {
                return null;
            }
        });
    }
    update(id, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.find(id);
                if (product === null) {
                    return 'invalid';
                }
                yield this.packModel.update(id, obj);
                return obj;
            }
            catch (err) {
                return null;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.find(id);
                if (product === null) {
                    return 'invalid';
                }
                yield this.packModel.delete(id);
                return 'success';
            }
            catch (err) {
                return null;
            }
        });
    }
}
exports.default = PackService;
