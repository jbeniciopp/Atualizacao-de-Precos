import { Request, Response } from "express";
import ProductService from "../service/product.service";

export default class ProductController {
  constructor(
    private productService = new ProductService(),
  ) { }

  async create(req: Request, res: Response) {
    const obj = req.body;
  
    if (!obj.code || !obj.name || !obj.costPrice || !obj.salesPrice) {
      return res.status(400).json({ message: 'Bad request' });
    }
  
    const result = await this.productService.create(obj);

    if (!result) {
      return res.status(500).json({ message: 'Internal Error' })
    }

    return res.status(201).json(result);
  }

  async list(_req: Request, res: Response) {
    const result = await this.productService.list();

    if (!result) {
      return res.status(500).json({ message: 'Internal Error' })
    }

    return res.status(200).json(result);
  }

  async find(req: Request, res: Response) {
    const { code } = req.params;

    const result = await this.productService.find(Number(code));

    if (!result) {
      return res.status(500).json({ message: 'Internal Error' })
    } if (result === 'invalid') {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const { code } = req.params;
    const obj = req.body;
  
    if (!obj.code || !obj.name || !obj.costPrice || !obj.salesPrice) {
      return res.status(400).json({ message: 'Bad request' });
    }

    const result = await this.productService.update(Number(code), obj);

    if (!result) {
      return res.status(500).json({message: 'Internal Error'})
    } if (result === 'invalid') {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.status(204);
  }

  async delete(req: Request, res: Response) {
    const { code } = req.params;

    const result = await this.productService.delete(Number(code));

    if (!result) {
      return res.status(500).json({message: 'Internal Error'})
    } if (result === 'invalid') {
      return res.status(404).json({ message: 'Not Found' })
    }

    return res.status(204);
  }
}