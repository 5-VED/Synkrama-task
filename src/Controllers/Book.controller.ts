import { Request, Response } from "express";
import { BookModel } from "../Models";
import message from "../Common/Constants/Messages";
import { HTTP_CODES } from "../Common/Constants/Enums";
import { IBook } from "@/Models/Book.model";


export class BookController {

    static async addBook(req: Request, res: Response): Promise<any> {
        try {
            const response = await BookModel.create(req.body);

            if (!response) {
            return res.status(HTTP_CODES.BAD_REQUEST).json({
                    message: message.ERROR_ADDING_BOOK
                })
            }            

            return res.status(HTTP_CODES.OK).json({
                message: message.BOOK_ADDED,
                success: true,
                data: response
            })

        } catch (error) {
            console.log("Error Adding Book to library:: ", error)
            return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR, success: false, data: error })
        }
    }

    static async getBook(req: Request, res: Response):Promise<any> {
        try {
            const id = req.params.id as string
            const response = await BookModel.findById(id)
            if (!response) {
                res.status(HTTP_CODES.NOT_FOUND).json({
                    message: message.BOOK_NOT_FOUND
                })
            }
            res.status(HTTP_CODES.OK).json({
                message: message.BOOK_FETCHED,
                success: true,
                data: response
            })

        } catch (error) {
            console.log("Error Fetching Book from library:: ", error)
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR, success: false, data: error })
        }

    }

    static async deleteBook(req: Request, res: Response):Promise<any> {
        try {
            const id = req.params.id as string
            const response = await BookModel.findOneAndDelete({ _id: id })

            if (!response) {
                res.status(HTTP_CODES.NOT_FOUND).json({
                    message: message.BOOK_NOT_FOUND,
                    success:false,
                    data:{}
                })
            }
            
            res.status(HTTP_CODES.OK).json({
                message: message.BOOK_REMOVED,
                success: true,
                data: response
            })

        } catch (error) {
            console.log("Error removing book :: ", error)
            return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: message.INTERNAL_SERVER_ERROR, success: false, data: error })
        }

    }

    static async getBooks(req: Request, res: Response):Promise<any> {
        try {
            const page = req.query.page ? parseInt(req.query.page as string) : 1
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 10
            const skip = (page - 1) * limit
            
            
            const search = req.query.search as string || ''
            const criteria: any = {}
            
            if (search) {
                criteria.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } },
                    { genre: { $regex: search, $options: 'i' } }
                ]
            }

            
            const count = await BookModel.countDocuments(criteria)
            
            const books = await BookModel.find(criteria)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 })
            
            if (!books || books.length === 0) {
                res.status(HTTP_CODES.NOT_FOUND).json({
                    message: message.BOOK_NOT_FOUND,
                    success: false
                })
                return
            }
            
            res.status(HTTP_CODES.OK).json({
                message: message.BOOK_FETCHED,
                success: true,
                data: {
                    books,
                    count
                }
            })

        } catch (error) {
            console.error("Error fetching books :: ", error)
            res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ 
                message: message.INTERNAL_SERVER_ERROR, 
                success: false, 
                data: error 
            })
        }
    }

    static async updateBook(req: Request, res: Response):Promise<any> {
        try {
            const id = req.params.id as string
            const payload = req.body as IBook
            const response = await BookModel.findOneAndUpdate({ _id: id }, 
                {
                ...payload
            }, 
            { new: true })

            if (!response) {
                return res.status(HTTP_CODES.NOT_FOUND).json({
                    message: message.BOOK_NOT_FOUND,
                    success: false
                })                
            }
            
           return res.status(HTTP_CODES.OK).json({
                message: message.BOOK_UPDATED, 
                success: true,
                data: response
            })

        } catch (error) {
            console.error("Error updating book :: ", error)
            return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ 
                message: message.INTERNAL_SERVER_ERROR, 
                success: false, 
                data: error 
            })
        }
    }

}