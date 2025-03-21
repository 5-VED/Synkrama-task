import { model, Schema, Document } from 'mongoose'

export interface IBook extends Document {
    title:string
    author:string
    year: number
    genre: string
    isActive?: boolean 
    isDeleted?: boolean
    createdAt?: string
    updatedAt?: string
}

const bookSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true
    },
    author: {
        type: Schema.Types.String,
        required: true
    },
    year:{
        type: Schema.Types.Number,
        required: true
    },
    genre:{
        type: Schema.Types.String,
        required: true
    },
    isActive:{
        type:Schema.Types.Boolean,
        default:true
    },
    isDeleted:{
        type:Schema.Types.Boolean,
        default:false
    }    
}, 
{
    timestamps: true
})

const BookModel = model<IBook>("Book",bookSchema)
export default BookModel
