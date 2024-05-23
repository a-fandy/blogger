import UserService from './userService';
import UserRepository from '../../repositories/userRepository';
import { Request } from 'express';
import { BadRequest, ForbiddenError, NotFoundError } from '../../exceptions/errorType';
import bcrypt from 'bcryptjs';

jest.mock('../../repositories/userRepository');
jest.mock('bcryptjs');

describe('UserService', () => {
    let userService: UserService;
    let mockRequest: Partial<Request>;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
        userService = new UserService(userRepository);
        mockRequest = {
            body: {},
            user: { _id: 'userId', role: 'user' }
        };
    });

    describe('create', () => {
        it('should throw BadRequest if email, password or confirmPassword is missing', async () => {
            mockRequest.body = { email: 'test@example.com', password: 'password123' };
            await expect(userService.create(mockRequest as Request)).rejects.toThrow('Email, password and confirm password are required');
        });

        it('should throw BadRequest if user already exists', async () => {
            mockRequest.body = { email: 'test@example.com', password: 'password123', confirmPassword: 'password123' };
            userRepository.findOne = jest.fn().mockResolvedValue(true);
            await expect(userService.create(mockRequest as Request)).rejects.toThrow('User already exists');
        });

        it('should create a new user if all validations pass', async () => {
            mockRequest.body = { email: 'test@example.com', password: 'password123', confirmPassword: 'password123' };
            userRepository.findOne = jest.fn().mockResolvedValue(null);
            userRepository.create = jest.fn().mockResolvedValue({ _id: 'newUserId', email: 'test@example.com' });
            bcrypt.genSalt = jest.fn().mockResolvedValue('salt');
            bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

            const result = await userService.create(mockRequest as Request);

            expect(userRepository.create).toHaveBeenCalledWith({ email: 'test@example.com', password: 'hashedPassword' });
            expect(result).toHaveProperty('_id', 'newUserId');
        });
    });

    describe('login', () => {
        it('should throw BadRequest if email or password is missing', async () => {
            mockRequest.body = { email: 'test@example.com' };
            await expect(userService.login(mockRequest as Request)).rejects.toThrow('Email and Password are required');
        });

        it('should throw BadRequest if user does not exist', async () => {
            mockRequest.body = { email: 'test@example.com', password: 'password123' };
            userRepository.findOne = jest.fn().mockResolvedValue(null);
            await expect(userService.login(mockRequest as Request)).rejects.toThrow('Invalid email or password');
        });

        it('should throw BadRequest if password does not match', async () => {
            mockRequest.body = { email: 'test@example.com', password: 'wrongPassword' };
            userRepository.findOne = jest.fn().mockResolvedValue({ password: 'hashedPassword' });
            bcrypt.compare = jest.fn().mockResolvedValue(false);
            await expect(userService.login(mockRequest as Request)).rejects.toThrow('Invalid email or password');
        });

        it('should return user if email and password match', async () => {
            mockRequest.body = { email: 'test@example.com', password: 'password123' };
            userRepository.findOne = jest.fn().mockResolvedValue({ _id: 'userId', password: 'hashedPassword' });
            bcrypt.compare = jest.fn().mockResolvedValue(true);

            const result = await userService.login(mockRequest as Request);

            expect(result).toHaveProperty('_id', 'userId');
        });
    });

  
});



