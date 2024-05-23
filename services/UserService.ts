import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import BadRequest from '../exceptions/errorType.js';
import { errorAuthFailed, errorField } from '../exceptions/StatusCode.js';

export const userCreate = async (request) => {
    const { name, email, password } = request.body
    if (!email || !password) {
        return BadRequest("email and password fields are required", errorField)
    }

    const userExist = await User.findOne({ email })
    if (userExist) {
        return BadRequest("user has been registered", errorField)
    }
    const salt = await bcrypt.genSalt()
    const passwordHashed = await bcrypt.hash(password, salt)
    const user = await User.create({ name, email, password: passwordHashed })

    return { email: user.email, name: user.name, role: user.role }
}

export const userLogin = async (request) => {
    const { email, password } = request.body
    if (!email || !password) {
        return BadRequest("email and password fields are required", errorField)
    }

    const user = await User.findOne({ email , deletedAt: null, status: true})
    if (!user) {
        return BadRequest("password and email are wrong", errorAuthFailed)
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
        return BadRequest("password and email are wrong", errorAuthFailed)
    }
    const token = createToken(user._id)
    return {
        user: {
            email: user.email,
            role: user.role,
            name: user.name
        },
        token: token
    }

}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: "15d" })
}