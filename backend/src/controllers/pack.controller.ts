import { Request, Response } from "express";
import PackService from "../service/pack.service";

export default class PackController {
  constructor(
    private packService = new PackService(),
  ) { }

  async create(req: Request, res: Response) {
    const obj = req.body;
  
    if (!obj.packId || !obj.productId || !obj.qty) {
      return res.status(400).json({ message: 'Bad request' });
    }
  
    const result = await this.packService.create(obj);

    if (!result) {
      return res.status(500).json({ message: 'Internal Error' })
    }

    return res.status(201).json(result);
  }

  async list(_req: Request, res: Response) {
    const result = await this.packService.list();

    if (!result) {
      return res.status(500).json({ message: 'Internal Error' })
    }

    return res.status(200).json(result);
  }

  async find(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.packService.find(Number(id));

    if (!result) {
      return res.status(500).json({ message: 'Internal Error' })
    } if (result === 'invalid') {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const obj = req.body;
  
    if (!obj.packId || !obj.productId || !obj.qty) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const result = await this.packService.update(Number(id), obj);

    if (!result) {
      return res.status(500).json({message: 'Internal Error'})
    } if (result === 'invalid') {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.status(204).end();
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const result = await this.packService.delete(Number(id));

    if (!result) {
      return res.status(500).json({message: 'Internal Error'})
    } if (result === 'invalid') {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.status(204).end();
  }
}