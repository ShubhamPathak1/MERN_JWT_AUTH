import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
    },
    isVerified: {
        type:Boolean,
        default:false,
    },
    lastLogin: {
        type:Date,
        default:Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, {timestamps:true})


export const User = mongoose.model("User", UserSchema);