import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';


@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(id: string, title: string, price: number): string {
        const newProduct = new Product(id, title, price);
        this.products.push(newProduct);
        return id;
    }

    retrieveProduct() {
        return [...this.products];
    }

    retrieveSingleProd(id: string) {
        const [product, prodIndex] = this.findProd(id);
        return {...product};
    }

    updateProd(id: string, title: string, price: number) {
        const [product, prodIndex] = this.findProd(id);
        const updatedProd = {...product}
        if (title) {
            updatedProd.title = title;
        }
        if (price) {
            updatedProd.price = price;
        }
        this.products[prodIndex] = updatedProd;
        return {...updatedProd};
    }
    
    private findProd(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id == id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not Find Product');
        }
        else {
            return [product, productIndex];
        }
    }
}
