import { Request, Router, Response } from 'express';
import ProductController from '../controllers/product.controller';

const productController = new ProductController();

const router = Router();

router.get('/', (req: Request, res: Response) => productController.list(req, res));

router.get('/:code', (req: Request, res: Response) => productController.find(req, res));

router.post('/', (req: Request, res: Response) => productController.create(req, res));

router.put('/:code', (req: Request, res: Response) => productController.create(req, res));

router.delete('/:code', (req: Request, res: Response) => productController.delete(req, res));

export default router;