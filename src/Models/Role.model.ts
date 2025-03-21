import { model, Schema, Document } from 'mongoose'

export interface IRole extends Document {
    role: string
    isActive?: boolean
    isDeleted?: boolean
    createdAt?: string
    updatedAt?: string
}

const roleSchema = new Schema({
    role: {
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
}, {
    timestamps: true
})

const RoleModel = model<IRole>("Role",roleSchema)
export default RoleModel
