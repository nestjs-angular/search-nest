import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './product.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ){}

    find(options) {
        return this.productModel.find(options);
    }

    count(options) {
        return this.productModel.count(options).exec();
    }
}
