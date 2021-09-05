import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ProductService } from './product.service';

@Controller('api/products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}

    @Get('frontend')
    async frontend() {
        return this.productService.find({}).exec()
    }

    @Get('backend')
    async backend(@Req() req: Request) {
        let options = {}
        if (req.query.s) {
            options = {
                $or: [
                    { title: new RegExp(req.query.s.toString(), 'i') },
                    { description: new RegExp(req.query.s.toString(), 'i') },
                ]
            }
        }

        const query = this.productService.find(options);

        if (req.query.sort) {
            query.sort({
                price: req.query.sort
            })
        }

        const page: number = Number(req.query.page) || 1;
        const limit = 9;
        const total = await this.productService.count(options)
        const data = await query.skip((page - 1) * limit).limit(limit).exec();
        return {
            data,
            total,
            page,
            lastPage: Math.ceil( total / limit)
        };
    }
}
