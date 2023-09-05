"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_router_1 = __importDefault(require("./routes/products.router"));
const pack_router_1 = __importDefault(require("./routes/pack.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (_req, res) => res.status(200).send('OK'));
app.use('/products', products_router_1.default);
app.use('/packs', pack_router_1.default);
exports.default = app;
