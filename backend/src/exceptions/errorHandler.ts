import { ErrorRequestHandler } from "express";
import { BadRequest } from "./errorType";
import { ErrorResponse } from "./errorResponse";

// Error handling middleware for JSON parsing errors
const jsonErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
        // Handle JSON parsing error
        console.log("Error global: ", err)
        return res.status(400).json(ErrorResponse(new BadRequest("Invalid JSON")));
    }
    next();
};


export {jsonErrorHandler};
