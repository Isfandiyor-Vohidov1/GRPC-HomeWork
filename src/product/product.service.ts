import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepo.create(createProductDto)
    return this.productRepo.save(product)
  }

  async findAll() {
    const products = await this.productRepo.find()
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id } })
    if (!product) {
      throw new NotFoundException('Product with this id not found')
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } })
    await this.productRepo.update({ id }, updateProductDto)
    return product;
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    await this.productRepo.delete({ id })
    return product
  }
}
