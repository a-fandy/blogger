import { Request } from "express";
import { BadRequest, NotFoundError } from "../../exceptions/errorType";
import ProductRepository from "../../repositories/productRespository";
import { log } from "console";
import mongoose from "mongoose";

class ProductService {

    productRepository: ProductRepository

    constructor(productRepository?: ProductRepository) {
        this.productRepository = productRepository || new ProductRepository()
    }

    async create(request: Request): Promise<any> {
        const { name, desc, price, imagePath } = request.body as { name: string; desc: string; price: number; imagePath: string };
        if (!name || !price) {
            throw new BadRequest("name and price fields are required")
        }
        const product = await this.productRepository.create({
            name,
            desc,
            price,
            imagePath,
            user: request.user._id.toString()
        })
        return product
    }

    async findAll(request: Request): Promise<any> {
        const { page, limit, filter } = request.body as { page: number; limit: number, filter: any };

        if (!page || !limit) {
            throw new BadRequest("page and limit fields are required")
        }

        let { id, search } = filter || {}
        const offset = (page - 1) * limit

        let query = {
            $or: [
                { name: { $regex: new RegExp(search, 'i') } },
                { desc: { $regex: new RegExp(search, 'i') } }
            ],
            deletedAt: null
        };

        if (id && mongoose.isValidObjectId(id)) {
            (query as any)._id = id;
        }

        const products = await this.productRepository.findAll(query, limit, offset)
        const totalCount = await this.productRepository.countProducts(query);
        const pageCount = Math.ceil(totalCount / limit);
        return {
            page: page,
            total: totalCount,
            totalPage: pageCount,
            products: products
        }
    }

    async findInUser(request: Request): Promise<any> {
        const { page, limit, filter } = request.body as { page: number; limit: number, filter: any };

        if (!page || !limit) {
            throw new BadRequest("page and limit fields are required")
        }

        let { id, search } = filter || {}
        const offset = (page - 1) * limit

        let query = {
            $or: [
                { name: { $regex: new RegExp(search, 'i') } },
                { desc: { $regex: new RegExp(search, 'i') } }
            ],
            deletedAt: null,
            user: request.user._id.toString()
        };

        if (id && mongoose.isValidObjectId(id)) {
            (query as any)._id = id;
        }
        
        const products = await this.productRepository.findAll(query, limit, offset)
        const totalCount = await this.productRepository.countProducts(query);
        const pageCount = Math.ceil(totalCount / limit);
        return {
            page: page,
            total: totalCount,
            totalPage: pageCount,
            products: products
        }
    }

    async update(request: Request): Promise<any> {
        const { id, name, desc, price, imagePath, categories, status } = request.body as { id: string; name: string; desc: string; price: number; imagePath: string, categories: string[], status: boolean };
    
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequest("Product not found")
        }
        const product = await this.productRepository.findOne({ _id: id , deletedAt: null, user: request.user._id.toString()})
        if (!product) {
            throw new NotFoundError("Product not found")
        }
        const updatedProduct = await this.productRepository.updateOne({ _id: id, deletedAt: null, user: request.user._id.toString() }, { name, desc, price, imagePath, categories, status })
        return updatedProduct
    }

    async delete(request: Request): Promise<any> {
        const { id } = request.body as { id: string };
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequest("Product not found")
        }
        const product = await this.productRepository.findOne({ _id: id , deletedAt: null, user: request.user._id.toString()})
        if (!product) {
            throw new NotFoundError("Product not found")
        }
        const deletedProduct = await this.productRepository.deleteOne({ _id: id , deletedAt: null, user: request.user._id.toString()});
        return deletedProduct
    }
}

export default ProductService
