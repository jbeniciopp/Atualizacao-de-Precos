"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pack_controller_1 = __importDefault(require("../controllers/pack.controller"));
const packController = new pack_controller_1.default();
const router = (0, express_1.Router)();
router.get('/', (req, res) => packController.list(req, res));
router.get('/:id', (req, res) => packController.find(req, res));
router.post('/', (req, res) => packController.create(req, res));
router.put('/:id', (req, res) => packController.update(req, res));
router.delete('/:id', (req, res) => packController.delete(req, res));
exports.default = router;
