import express from 'express';
import { auth } from './auth';
import { BaseController } from './BaseController';
import ProductService from '../api/product/productService';
import ProductRepository from '../repositories/productRespository';

export const routes = (app: express.Router) => {
    app.use('/api/v1/product', productRoute)
    // app.use('/api/v1/user', userRoute)
}

const productRoute = express.Router()
const productService = new ProductService();
productRoute.post('/', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "create"))

productRoute.get('/', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "findAll"))

productRoute.get('/user', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "findInUser"))

productRoute.post('/update', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "update"))

productRoute.post('/delete', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "delete"))

