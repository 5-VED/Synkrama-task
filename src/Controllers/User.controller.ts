import { Request, Response } from "express";
import { UserModel, RoleModel } from "../Models";
import message from "../Common/Constants/Messages";
import { HTTP_CODES } from "../Common/Constants/Enums";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "../Config/config"
const JWT_SECRET = config.jwt.secret
const SALT_ROUNDS = 10;

export class UserController {
    static async signup(req: Request, res: Response): Promise<any> {
        try {
            const { firstName, lastName, email, password, role } = req.body;
            
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    message: message.EMAIL_ALREADY_EXISTS,
                    success: false
                });
                
            }
            
            if (role) {
                const roleExists = await RoleModel.findById(role);
                if (!roleExists) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                        message: message.INVALID_ROLE,
                        success: false
                    });
                    
                }
            }
            
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            
            const newUser = await UserModel.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role
            });

            
            const token = jwt.sign(
                { id: newUser._id, email: newUser.email, role: newUser.role },
                JWT_SECRET,
                { expiresIn: config.jwt.expiresIn }
            );

            return res.status(HTTP_CODES.OK).json({
                message: message.USER_CREATED_SUCCESSFULLY,
                success: true,
                data: {
                    user: {
                        id: newUser._id,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        role: newUser.role
                    },
                    token
                }
            });

        } catch (error) {
            console.error("Error in user signup:", error);
            return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                message: message.INTERNAL_SERVER_ERROR,
                success: false,
                data: error
            });
        }
    }

    static async login(req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            
            const user = await UserModel.findOne({ 
                email, 
                isActive: true, 
                isDeleted: false 
            }).populate('role');

            if (!user) {
                res.status(HTTP_CODES.NOT_FOUND).json({
                    message: message.EMAIL_NOT_FOUND,
                    success: false
                });
                return;
            }

            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    message: message.INVALID_PASSWORD,
                    success: false
                });
                
            }
            
            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: config.jwt.expiresIn }
            );

            return res.status(HTTP_CODES.OK).json({
                message: message.USER_LOGIN_SUCCESSFULLY,
                success: true,
                data: {
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role
                    },
                    token
                }
            });

        } catch (error) {
            console.error("Error in user login:", error);
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({
                message: message.INTERNAL_SERVER_ERROR,
                success: false,
                data: error
            });
        }
    }
}