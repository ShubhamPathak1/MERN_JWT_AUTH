import bcrypt from "bcrypt"
import { User } from "../models/auth.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mail/emails.js";


export const signup = async (req, res)=> {
    const {username, email, password} = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({success:false, message:"Empty fields"})
        }
        const userAlreadyExists = await User.findOne({email})
        if (userAlreadyExists) {
            return res.status(400).json({success:false, message:"User Already Exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();

        const user = new User({
            username, 
            email, 
            password:hashedPassword,
            verificationToken:verificationToken,
            verificationTokenExpiresAt: Date.now() + 15*60*1000
        })
        await user.save();

        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(200).json({success:true, message:"User Created Succesfully", user:{...user._doc, password:undefined}})
        
    } catch (error) {
        console.log("Error in registering user", error);
        res.status(500).json({success:false, message:error.message})
    }
    
}

export const login = async (req, res)=> {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({success:false, message:"Empty Fields"})
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({success:false, message:"Invalid Credentials"})
            
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            res.status(400).json({success:false, message:"Invalid Credentials"})
        }

        generateTokenAndSetCookie(res, user._id);
        
        user.lastLogin = Date.now();
        
        await user.save();
        
        res.status(200).json({success:true, message:"User Logged in Succesfully", user:{...user._doc, password:undefined}})
        
        
    } catch (error) {
        console.log("Error in logging in user", error);
        res.status(500).json({success:false, message:error.message})
        
    }
}

export const logout = async (req, res)=> {
    try {
        res.clearCookie("token");
        res.status(200).json({success:true, message:"User Logged Out Succesfully"})
    } catch (error) {
        console.log("Error in logging out user", error);
        res.status(500).json({success:false, message:error.message})
        
    }
}

export const verifyEmail = async (req, res)=> {
    const {otp} = req.body;
    try {
        if (!otp) {
            res.status(400).json({success:false, message:"OTP not given"})
        }
        const user = await User.findOne({verificationToken:otp, verificationTokenExpiresAt: {$gt: Date.now()}})
        if (!user) {
            res.status(400).json({success:false, message:"Invalid or Expired OTP"})
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();


        await sendWelcomeEmail(user.username, user.email);
    

        res.status(200).json({success:true, message:"User Verified Successfully", user:{...user._doc, password:undefined}})

    } catch (error) {
        console.log("Error in verifying email", error);
        res.status(500).json({success:false, message:error.message})
    }
}
export const forgotPassword = (req, res)=> {
    res.send("forgot password")
}
export const resetPassword = (req, res)=> {
    res.send("reset password")
}

export const checkAuth = async (req, res)=> {
    try {
        const user = await User.findById(req.userId)
        if (!user) {
            return res.status(400).json({success:false, message:"User not found"})
        }
        res.status(200).json({success:true, user})

    } catch (error) {
        console.log("Error in checking authentication", error.message)
        res.status(400).json({success:false, message:error.message})
    }
}
