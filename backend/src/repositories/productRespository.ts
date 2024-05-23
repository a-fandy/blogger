import ProductDto from "../api/product/productDto";
import Product from "../models/ProductModel";


class ProductRepository {

    async create(product: ProductDto): Promise<ProductDto> {
        const newProduct = await Product.create(product)
        return {
            // user: newProduct.user.toString(),
            name: newProduct.name,
            desc: newProduct.desc,
            price: newProduct.price,
            imagePath: newProduct.imagePath,
            categories: newProduct.categories,
            status: newProduct.status,
            // deletedAt: newProduct.deletedAt,
        }
    }

    async findAll(query: any, limit: number, offset: number): Promise<ProductDto[]> {
        const products = await Product.find(query).sort({ createdAt: -1 }).limit(limit).skip(offset)
        return products.map(product => ({
            id: product._id.toHexString(),
            name: product.name,
            desc: product.desc,
            price: product.price,
            imagePath: product.imagePath,
            categories: product.categories,
            status: product.status
        }));
    }

    async countProducts(query: any): Promise<number> {
        return await Product.countDocuments(query)
    }

    async findOne(query: any): Promise<ProductDto | null> {
        (query as any).deletedAt = null
        return await Product.findOne(query)
    }

    async updateOne(query:any, update: ProductDto): Promise<ProductDto | null> {
        (query as any).deletedAt = null
        const updatedProduct = await Product.findOneAndUpdate(query, update)
        if (!updatedProduct) {
            return null
        }
        return {
            name: updatedProduct.name,
            desc: updatedProduct?.desc,
            price: updatedProduct.price,
            imagePath: updatedProduct?.imagePath,
            categories: updatedProduct?.categories,
            status: updatedProduct?.status
        }
    }

    async deleteOne(query:any): Promise<ProductDto | null> {
        (query as any).deletedAt = null
        const deletedProduct = await Product.findByIdAndUpdate(query, { deletedAt: Date.now() })
        if (!deletedProduct) {
            return null
        }
        return {
            id: deletedProduct._id.toHexString(),
            name: deletedProduct.name,
            desc: deletedProduct.desc,
            price: deletedProduct.price,
            imagePath: deletedProduct.imagePath,
            categories: deletedProduct.categories,
            status: deletedProduct.status
        }
    }
}

export default ProductRepository

