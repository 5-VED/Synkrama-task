import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Schema.Types.ObjectId;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
    firstName: {
        type: Schema.Types.String,
        required: true,
      
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
      
    },
    email: {
        type: Schema.Types.String,
        required: true,      
        lowercase: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
        required: false
    },
    isActive: {
        type: Schema.Types.Boolean,
        default: true
    },
    isDeleted: {
        type: Schema.Types.Boolean,
        default: false
    }
}, {
    timestamps: true
});

const UserModel = model<IUser>("User", userSchema);
export default UserModel; 