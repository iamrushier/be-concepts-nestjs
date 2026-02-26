import { Controller, Get, Param, ParseIntPipe, Version } from '@nestjs/common';
import { ProductsService } from './products.service';
import { version } from 'os';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductsService) { }

    @Version('1')
    @Get()
    findAllV1() {
        return this.productService.findAll('1')
    }

    @Version('1')
    @Get(":id")
    findOneV1(@Param("id", ParseIntPipe) id: number) {
        return this.productService.findOne(id, '1')
    }

    @Version('2')
    @Get()
    findAllV2() {
        return this.productService.findAll('2')
    }

    @Version('2')
    @Get(":id")
    findOneV2(@Param("id", ParseIntPipe) id: number) {
        return this.productService.findOne(id, '2')
    }
}
