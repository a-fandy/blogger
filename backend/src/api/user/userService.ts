import { Request } from "express"
import bcrypt from 'bcryptjs';
import UserRepository from "../../repositories/userRepository"
import { BadRequest, ForbiddenError } from "../../exceptions/errorType"
import mongoose from "mongoose";

class UserService {

    userRepository: UserRepository

    constructor(userRepository?: UserRepository) {
        this.userRepository = userRepository || new UserRepository()
    }

    async create(req: Request) {
        const {email, password, confirmPassword} = req.body as {email:string, password:string, confirmPassword:string}
        if (!email || !password || !confirmPassword) {
            throw new BadRequest('Email, password and confirm password are required')
        }
        
        const userExist = await this.userRepository.findOne({email})
        if (userExist) {
            throw new BadRequest('User already exists')
        }

        if (password !== confirmPassword) {
            throw new BadRequest('Password and Confirm Password do not match')
        }
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const createdUser = this.userRepository.create({email, password: hashedPassword})
        return createdUser
    }

    async login(req: Request) {
        const {email, password} = req.body as {email:string, password:string}
        if (!email || !password) {
            throw new BadRequest('Email and Password are required')
        }
        const user = await this.userRepository.findOne({email})
        if (!user) {
            throw new BadRequest('Invalid email or password')
        }
        const passwordMatch = await bcrypt.compare(password, user.password as string)
        if (!passwordMatch) {
            throw new BadRequest('Invalid email or password')
        }
        return user
    }

    async findAll(request: Request) {
        const { page, limit, filter } = request.body as { page: number; limit: number, filter: any };

        if (request.user.role != 'admin') {
            throw new ForbiddenError("You are not authorized to access this resource")
        }

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

        const users = await this.userRepository.findAll(query, limit, offset)
        const totalCount = await this.userRepository.countUsers(query);
        const pageCount = Math.ceil(totalCount / limit);
        return {
            page: page,
            total: totalCount,
            totalPage: pageCount,
            users: users
        }
    }

    async update(request: Request) {
       const { id, name, password, confirmPassword, status } = request.body as { id: string, name: string, password: string, confirmPassword: string, status: boolean };
       if (!id) {
           throw new BadRequest("User not found")
       }
       if (request.user.role != 'admin') {
           throw new ForbiddenError("You are not authorized to access this resource")
       }

       let dataUser = {
           name,
           status
       }
       if (password && confirmPassword) {
           if (password !== confirmPassword) {
               throw new BadRequest("Password and Confirm Password do not match")
           }
           const salt = await bcrypt.genSalt()
           const hashedPassword = await bcrypt.hash(password, salt);
           (dataUser as any).password = hashedPassword
       }
       
       const updatedUser = await this.userRepository.updateOne({ _id: id }, dataUser)
       if (!updatedUser) {
           throw new BadRequest("User not found")
       }
       return updatedUser
    }

    async delete(request: Request) {
        const { id } = request.body as { id: string };
        if (!id) {
            throw new BadRequest("User not found")
        }
        if (request.user.role != 'admin') {
            throw new ForbiddenError("You are not authorized to access this resource")
        }
        const deletedUser = await this.userRepository.deleteOne({ _id: id })
        if (!deletedUser) {
            throw new BadRequest("User not found")
        }
        return deletedUser
    }

}

export default UserService

