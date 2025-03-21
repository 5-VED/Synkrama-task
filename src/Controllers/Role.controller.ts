import { Request, Response } from "express";
import { RoleModel } from "../Models";
import message from "../Common/Constants/Messages";
import { HTTP_CODES } from "../Common/Constants/Enums";

export class RoleController {
    static async addRole(req: Request, res: Response): Promise<any> {
        try {
            const { role } = req.body;

            const existingRole = await RoleModel.findOne({ role });
            if (existingRole) {
                return res.status(HTTP_CODES.BAD_REQUEST).json({
                    message: message.ROLE_EXISTS,
                    success: false
                });
                
            }
            
            const newRole = await RoleModel.create({ role });
            
            return res.status(HTTP_CODES.OK).json({
                message: message.ROLE_CREATED,
                success: true,
                data: newRole
            });

        } catch (error) {
            console.error("Error adding role :: ", error);
            return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ 
                message: message.INTERNAL_SERVER_ERROR, 
                success: false, 
                data: error as any 
            });
        }
    }

    static async deleteRole(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            
            
            const role = await RoleModel.findById(id);
            if (!role) {
                return res.status(HTTP_CODES.NOT_FOUND).json({
                    message: message.ROLE_NOT_FOUND,
                    success: false
                });                
            }
            
            
            const response = await RoleModel.findByIdAndDelete(
                id,                 
                { new: true }
            );

            return res.status(HTTP_CODES.OK).json({
                message: message.ROLE_REMOVED,
                success: true,
                data: response
            });

        } catch (error) {
            console.error("Error deleting role :: ", error);
            return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ 
                message: message.INTERNAL_SERVER_ERROR, 
                success: false, 
                data: error 
            });
        }
    }

    static async getRoles(req: Request, res: Response): Promise<any> {
        try {
            const roles = await RoleModel.find({ 
                isActive: true, 
                isDeleted: false 
            });
            
            return res.status(HTTP_CODES.OK).json({
                message: "Roles fetched successfully",
                success: true,
                data: roles
            });

        } catch (error) {
            console.error("Error fetching roles :: ", error);
            return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ 
                message: message.INTERNAL_SERVER_ERROR, 
                success: false, 
                data: error
            });
        }
    }
}
