// types.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // Define more specifically if possible, e.g., UserDocument
  }
}