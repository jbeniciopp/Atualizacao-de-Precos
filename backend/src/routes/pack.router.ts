import { Request, Router, Response } from 'express';
import PackController from '../controllers/pack.controller';

const packController = new PackController();

const router = Router();

router.get('/', (req: Request, res: Response) => packController.list(req, res));

router.get('/:id', (req: Request, res: Response) => packController.find(req, res));

router.post('/', (req: Request, res: Response) => packController.create(req, res));

router.put('/:id', (req: Request, res: Response) => packController.update(req, res));

router.delete('/:id', (req: Request, res: Response) => packController.delete(req, res));

export default router;