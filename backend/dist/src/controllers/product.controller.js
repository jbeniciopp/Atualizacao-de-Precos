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
const product_service_1 = __importDefault(require("../service/product.service"));
class ProductController {
    constructor(productService = new product_service_1.default()) {
        this.productService = productService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = req.body;
            if (!obj.code || !obj.name || !obj.costPrice || !obj.salesPrice) {
                return res.status(400).json({ message: 'Bad request' });
            }
            const result = yield this.productService.create(obj);
            if (!result) {
                return res.status(500).json({ message: 'Internal Error' });
            }
            return res.status(201).json(result);
        });
    }
    list(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.productService.list();
            if (!result) {
                return res.status(500).json({ message: 'Internal Error' });
            }
            return res.status(200).json(result);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.params;
            const result = yield this.productService.find(Number(code));
            if (!result) {
                return res.status(500).json({ message: 'Internal Error' });
            }
            if (result === 'invalid') {
                return res.status(404).json({ message: 'Not Found' });
            }
            return res.status(200).json(result);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.params;
            const obj = req.body;
            if (!obj.code || !obj.name || !obj.costPrice || !obj.salesPrice) {
                return res.status(400).json({ message: 'Bad request' });
            }
            const result = yield this.productService.update(Number(code), obj);
            if (!result) {
                return res.status(500).json({ message: 'Internal Error' });
            }
            if (result === 'invalid') {
                return res.status(404).json({ message: 'Not Found' });
            }
            return res.status(204).end();
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.params;
            const result = yield this.productService.delete(Number(code));
            if (!result) {
                return res.status(500).json({ message: 'Internal Error' });
            }
            if (result === 'invalid') {
                return res.status(404).json({ message: 'Not Found' });
            }
            return res.status(204).end();
        });
    }
}
exports.default = ProductController;
