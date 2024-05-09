import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const productId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: productId };
    }

    @Get()
    async getAllProducts() {
        return await this.productsService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        const product = await this.productsService.getSingleProduct(prodId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string, 
        @Body('title') prodTitle: string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number
    ) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string) {
        await this.productsService.deleteProduct(prodId);
        return null;
    }
}
