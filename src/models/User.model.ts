import { Schema, model } from "mongoose";

interface IUser {
    avatar?: string,
    username: string,
    email: string,
    password: string
}

const UserSchema = new Schema<IUser>({
    avatar: {
        type: String  
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\S+$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        select: false
    },

}, {
    timestamps: true
});

const User = model<IUser>("User", UserSchema);
export default User;