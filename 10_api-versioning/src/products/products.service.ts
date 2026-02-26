import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
    id: number;
    name: string;
    price?: number;
    stock?: number;
    description?: string;
    createdAt?: Date
}

@Injectable()
export class ProductsService {
    private readonly products: Product[] = [
        { id: 1, name: 'Laptop', price: 1299, stock: 15, description: 'High-performance laptop', createdAt: new Date() },
        { id: 2, name: 'Mouse', price: 29, stock: 120, description: 'Wireless mouse', createdAt: new Date() },
    ]

    findAll(version: string): Partial<Product>[] {
        if (version === "1") {
            return this.products.map(p => ({ id: p.id, name: p.name }))
        }
        // v2 and future
        return this.products
    }
    findOne(id: number, version: string): Partial<Product> {
        const product = this.products.find(p => p.id === id)
        if (!product) throw new NotFoundException(`Product #${id} not found`)
        if (version === "1") return { id: product.id, name: product.name }
        return product
    }
}
