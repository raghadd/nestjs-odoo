import { Controller, Post, Body, Get, Param, Patch } from "@nestjs/common";
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('id') prodId: string, 
        @Body('title') prodTitle: string, 
        @Body('price') prodPrice: number,
    ) {
        const returnedId = this.productsService.insertProduct(
            prodId, 
            prodTitle, 
            prodPrice,
        );
        return { id: returnedId };
    }

    @Get()
    listAll() {
        return this.productsService.retrieveProduct();
    }

    @Get(':id')
    getProd(@Param('id') prodId: string) {
        return this.productsService.retrieveSingleProd(prodId);
    }

    @Patch(':id')
    updateProd(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string,
        @Body('price') prodPrice: number,
        ) {
        this.productsService.updateProd(prodId, prodTitle, prodPrice);
        return null;
    }
}   