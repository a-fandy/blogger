import express from 'express';
import { auth } from './auth';
import { BaseController } from './BaseController';
import ProductService from '../api/product/productService';
import ProductRepository from '../repositories/productRespository';
import UserService from '../api/user/userService';

export const routes = (app: express.Router) => {
    app.use('/api/v1/product', productRoute)
    app.use('/api/v1/user', userRoute)
}

const productRoute = express.Router()
const productService = new ProductService();
productRoute.post('/', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "create"))

productRoute.get('/',
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "findAll"))

productRoute.get('/user', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "findInUser"))

productRoute.post('/update', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "update"))

productRoute.post('/delete', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, productService, "delete"))


const userRoute = express.Router()
const userService = new UserService();
userRoute.post('/',
    (req: express.Request, res: express.Response) => BaseController(req, res, userService, "create"))

userRoute.post('/login',
    (req: express.Request, res: express.Response) => BaseController(req, res, userService, "login"))

userRoute.get('/', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, userService, "findAll"))

userRoute.post('/update', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, userService, "update"))

userRoute.post('/delete', auth,
    (req: express.Request, res: express.Response) => BaseController(req, res, userService, "delete"))