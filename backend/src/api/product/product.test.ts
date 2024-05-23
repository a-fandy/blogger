import { Request } from 'express';
import ProductService from './productService';
import ProductRepository from '../../repositories/productRespository';

describe('ProductService', () => {
    let productService: ProductService;
    let mockProductRepository: Partial<ProductRepository>;

    const product = {
        name: 'Test Product',
        price: 100,
        desc: 'Description',
        imagePath: 'path/to/image',
        user: '12345'
    };

    const mockProducts = [
        { name: 'Test Product 1', desc: 'Description 1', price: 100, imagePath: 'path/to/image1', categories: ['cat1'], status: true },
        { name: 'Test Product 2', desc: 'Description 2', price: 200, imagePath: 'path/to/image2', categories: ['cat2'], status: false }
    ];

    const mockProductsInUser = [
        { id: '6642dd388e0e958c252bb9cc', name: 'Test Product 3', desc: 'Description 3', price: 300, imagePath: 'path/to/image3', categories: ['cat3'], status: true, user: '12345' },
        { id: '6642dd388e0e958c252bb9cd', name: 'Test Product 4', desc: 'Description 4', price: 400, imagePath: 'path/to/image4', categories: ['cat4'], status: false, user: '12345' },
    ];

    beforeEach(() => {
        mockProductRepository = {
            create: jest.fn().mockResolvedValue(product)
        };
        productService = new ProductService(mockProductRepository as ProductRepository);

    });

    it('should create a product successfully', async () => {
        const mockRequest = {
            body: {
                name: 'Test Product',
                price: 100,
                desc: 'Description',
                imagePath: 'path/to/image'
            },
            user: { _id: '12345' }
        };
        const result = await productService.create(mockRequest as Request);
        expect(result).toEqual(product);
        expect(mockProductRepository.create).toHaveBeenCalledWith(product);
    });

    it('should throw an error if name or price is missing', async () => {
        const mockRequest = {
            body: {
                desc: 'Description',
                imagePath: 'path/to/image'
            },
            user: { _id: '12345' }
        };
        await expect(productService.create(mockRequest as Request)).rejects.toThrow('name and price fields are required');
    });

    it('should retrieve products with pagination and filters', async () => {
        const mockRequest = {
            body: {
                page: 1,
                limit: 10,
                filter: {
                    search: 'Test'
                }
            }
        };

        mockProductRepository.findAll = jest.fn().mockResolvedValue(mockProducts);
        mockProductRepository.countProducts = jest.fn().mockResolvedValue(2);

        const result = await productService.findAll(mockRequest as Request);

        expect(result).toEqual({
            page: 1,
            total: 2,
            totalPage: 1,
            products: mockProducts
        });

        expect(mockProductRepository.findAll).toHaveBeenCalledWith({
            $or: [
                { name: { $regex: new RegExp('Test', 'i') } },
                { desc: { $regex: new RegExp('Test', 'i') } }
            ],
            deletedAt: null
        }, 10, 0);

        expect(mockProductRepository.countProducts).toHaveBeenCalledWith({
            $or: [
                { name: { $regex: new RegExp('Test', 'i') } },
                { desc: { $regex: new RegExp('Test', 'i') } }
            ],
            deletedAt: null
        });
    });

    it('should retrieve products in user', async () => {
        const mockRequest = {
            body: {
                page: 1,
                limit: 10,
                filter: {
                    search: 'Test'
                }
            },
            user: { _id: '12345' }
        };

        mockProductRepository.findAll = jest.fn().mockResolvedValue(mockProductsInUser);
        mockProductRepository.countProducts = jest.fn().mockResolvedValue(2);

        const result = await productService.findInUser(mockRequest as Request);

        expect(result).toEqual({
            page: 1,
            total: 2,
            totalPage: 1,
            products: mockProductsInUser
        });

        expect(mockProductRepository.findAll).toHaveBeenCalledWith({
            $or: [
                { name: { $regex: new RegExp('Test', 'i') } },
                { desc: { $regex: new RegExp('Test', 'i') } },
            ],
            deletedAt: null,
            user: '12345'
        }, 10, 0);

        expect(mockProductRepository.countProducts).toHaveBeenCalledWith({
            $or: [
                { name: { $regex: new RegExp('Test', 'i') } },
                { desc: { $regex: new RegExp('Test', 'i') } },
            ],
            deletedAt: null,
            user: '12345'
        });
    });

    it('should update a product successfully', async () => {
        const mockRequest = {
            body: {
                id: '6642dd388e0e958c252bb9cc',
                name: 'Updated Product',
                desc: 'Updated Description',
                price: 150,
                imagePath: 'updated_path.jpg',
                categories: ['updated_category'],
                status: true
            },
            user: { _id: '12345', role: 'user' }
        };

        const updatedProduct = {
            id: '6642dd388e0e958c252bb9cc',
            name: 'Updated Product',
            desc: 'Updated Description',
            price: 150,
            imagePath: 'updated_path.jpg',
            categories: ['updated_category'],
            status: true
        };

        mockProductRepository.updateOne = jest.fn().mockResolvedValue(updatedProduct);

        const result = await productService.update(mockRequest as Request);

        expect(result).toEqual(updatedProduct);
        expect(mockProductRepository.updateOne).toHaveBeenCalledWith({ _id: '6642dd388e0e958c252bb9cc', user: '12345' },
            {
                name: 'Updated Product',
                desc: 'Updated Description',
                price: 150,
                imagePath: 'updated_path.jpg',
                categories: ['updated_category'],
                status: true
            });
    });

    it('should delete a product successfully', async () => {
        const mockRequest = {
            body: {
                id: '6642dd388e0e958c252bb9cc'
            },
            user: { _id: '12345', role: 'user' }
        };

        const deletedProduct = {
            id: '6642dd388e0e958c252bb9cc',
            name: 'Test Product',
            desc: 'Test Description',
            price: 100,
            imagePath: 'path.jpg',
            categories: ['category'],
            status: false
        };

        mockProductRepository.deleteOne = jest.fn().mockResolvedValue(deletedProduct);

        const result = await productService.delete(mockRequest as Request);
        expect(result).toEqual(deletedProduct);
        expect(mockProductRepository.deleteOne).toHaveBeenCalledWith({ _id: '6642dd388e0e958c252bb9cc', user: '12345' });
    }); // This closes the last test case

}); // This closes the describe bloc
