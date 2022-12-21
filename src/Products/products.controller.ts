import { Body, Controller, Get, Post } from "@nestjs/common";
import { stringify } from "querystring";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    
    @Post()
    addProduct(
        @Body('title') prodTitle: string, 
        @Body('descirption') prodDesc: string, 
        @Body('price') prodPrice: number
    ) {
        const generatedId = this.productsService.addProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );
        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }
}