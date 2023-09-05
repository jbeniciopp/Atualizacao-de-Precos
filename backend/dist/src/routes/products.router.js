"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const productController = new product_controller_1.default();
const router = (0, express_1.Router)();
router.get('/', (req, res) => productController.list(req, res));
router.get('/:code', (req, res) => productController.find(req, res));
router.post('/', (req, res) => productController.create(req, res));
router.put('/:code', (req, res) => productController.update(req, res));
router.delete('/:code', (req, res) => productController.delete(req, res));
exports.default = router;
