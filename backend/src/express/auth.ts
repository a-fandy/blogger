import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import express from 'express';
import { AuthenticationFailed, InternalError } from "../exceptions/errorType.js";
import { ErrorResponse } from "../exceptions/errorResponse.js";

const auth = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json(ErrorResponse(new AuthenticationFailed("Authorization token not found")))
    }

    try {
        const token = authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.SECRET!) as jwt.JwtPayload
        const id:string = decode.id
        req.user = await User.findOne({ _id: id, deletedAt: null, status: true }).select("_id, role")
        if (!req.user) {
            return res.status(401).json(ErrorResponse(new AuthenticationFailed("Credential not found")));
        }
        next()
    } catch (error) {
        console.log(`Error in Auth  : `, error);
        let message: string = "error code";
        if (error instanceof Error) {
            message = process.env.DEBUG == 'true' ? error.message : message
		} 
        return res.status(500).json(ErrorResponse(new InternalError(message)));
    }

}

export { auth };

