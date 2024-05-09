import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const newProduct = await this.productRepository.create({
      title,
      description: desc,
      price,
    });
    await this.productRepository.save(newProduct);
    return newProduct.id;
  }

  async getProducts() {
    return await this.productRepository.find();
  }

  async getSingleProduct(productId: string) {
    return await this.productRepository.findOne({ where: { id: productId } });
  }
  

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    product.title = title || product.title;
    product.description = desc || product.description;
    product.price = price || product.price;
    await this.productRepository.save(product);
  }
  

  async deleteProduct(prodId: string) {
    const result = await this.productRepository.delete(prodId);
    if (result.affected === 0) {
      throw new NotFoundException('Could not find product');
    }
  }
}
