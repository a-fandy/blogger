import { IError, InternalError } from "./errorType";
import { BadRequest, ForbiddenError, NotFoundError, AuthenticationFailed } from "./errorType";

const ErrorResponse = (error: IError) => {
    let response = {
        code: error.code? error.code : 500,
        message: error.name,
        error: error.message
    };

    if (process.env.DEBUG === 'false' && error instanceof InternalError) {
        response.error = "Internal Server Error";
    }

    return response;
};


export { ErrorResponse }

