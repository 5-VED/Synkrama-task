import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../Config/config';
import message from '../Common/Constants/Messages';
import { HTTP_CODES } from '../Common/Constants/Enums';

const JWT_SECRET = config.jwt.secret as string;

interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role?: string;
    };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(HTTP_CODES.BAD_REQUEST).json({ message: message.TOKEN_REQUIRED, success:false,data:{}});
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };

        next();
    } catch (error) {        
        return res.status(HTTP_CODES.FORBIDDEN).json({ message: message.UNAUTHORIZED,success:false });
    }
};
