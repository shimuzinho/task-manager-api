import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

interface IUser {
    avatar?: string,
    username: string,
    email: string,
    password: string
}

const UserSchema = new Schema<IUser>({
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/lrev6pdl/image/upload/v1783381236/avatarDefault_t6wthh.png"
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
        select: false,
        match: /^\S+$/
    },

}, {
    timestamps: true
});

UserSchema.pre("save", async function() {
    if (!this.isModified('password')) {
        return;
    }
    
    try {
        const salt = await bcryptjs.genSalt(8);
        const hashPassword = await bcryptjs.hash(this.password, salt);
    
        this.password = hashPassword;
    } catch (error) {
        throw new Error("Failed to hash password.");
    }
});

const User = model<IUser>("User", UserSchema);
export default User;