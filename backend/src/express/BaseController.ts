import { Request, Response } from 'express';
import { IError, InternalError } from '../exceptions/errorType';
import { ErrorResponse } from '../exceptions/errorResponse';


const BaseController = async (req: Request, res: Response, service: any, operation: string) => {
    try {
        const data = await service[operation](req);
        if (!data.code) {
            return res.status(200).json({ code: 200, message: 'success', data: data });
        } else {
            return res.status(data.code).json(data);
        }
    } catch (error) {
        if(error instanceof InternalError){
            console.log(`Error in ${operation} controller: `, error);
        }
        const dataError  = ErrorResponse(error as IError);
        return res.status(dataError.code).json(dataError);
    }
}

export {BaseController}
