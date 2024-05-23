import UserDto from "../api/user/userDto";
import User from "../models/UserModel";

class UserRepository {
    async create(user: UserDto) : Promise<UserDto> {
        const newUser = await User.create(user)
        return {
            email: newUser.email
        }
    }

    async findAll(query:any, limit: number, offset: number) : Promise<UserDto[]> {
        const users = await User.find(query).sort({ createdAt: -1 }).limit(limit).skip(offset)
        return users.map((user) => ({
            _id: user._id.toHexString(),
            email: user.email,
            status: user.status,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }))
    }

    async countUsers(query:any) : Promise<number> {
        return await User.countDocuments(query)
    }

    async findOne(query:any) : Promise<UserDto | null> {
        (query as any).deletedAt = null
        return await User.findOne(query)
    }

    async updateOne(query:any, user: UserDto) : Promise<UserDto | null> {
        (query as any).deletedAt = null
        const updatedUser = await User.findByIdAndUpdate(query, user)
        if (!updatedUser) {
            return null
        }
        return {
            email: updatedUser.email
        }
    }

    async deleteOne(query:any) : Promise<UserDto | null> {
        (query as any).deletedAt = null
        const deletedUser = await User.findByIdAndUpdate(query, { deletedAt: new Date() })
        if (!deletedUser) {
            return null
        }
        return {
            email: deletedUser.email
        }
    }
}


export default UserRepository