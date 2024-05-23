
class IError extends Error{
    code: number; 
    constructor(message: string) {
        super(message);
        this.code = 500;
    }
}

class BadRequest extends IError {

    constructor(message: string) {
        super(message);
        this.code = 400;
        this.name = 'BadRequest';
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BadRequest);
        }
    }
}

class ForbiddenError extends IError {
    code: number;

    constructor(message: string) {
        super(message);
        this.code = 403;
        this.name = 'ForbiddenError';
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ForbiddenError);
        }
    }
}

class NotFoundError extends IError {
    code: number;

    constructor(message: string) {
        super(message);
        this.code = 404;
        this.name = 'NotFoundError';
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotFoundError);
        }
    }
}

class AuthenticationFailed extends IError {
    code: number;

    constructor(message: string, detail?: any) {
        super(message);
        this.code = 401;
        this.name = 'AuthenticationFailed';
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthenticationFailed);
        }
    }
}

class InternalError extends IError {
    code: number;

    constructor(message: string, detail?: any) {
        super(message);
        this.code = 500;
        this.name = 'InternalError';
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InternalError);
        }
    }
}

export {BadRequest , AuthenticationFailed, InternalError, NotFoundError, ForbiddenError, IError};

