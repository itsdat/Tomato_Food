import type { NextFunction, Request, Response } from 'express';
import multer from 'multer';
export declare const upload: multer.Multer;
export declare const resizeImage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=utils.d.ts.map