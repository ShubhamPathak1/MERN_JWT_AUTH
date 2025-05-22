import bcrypt from "bcrypt"
import { User } from "../models/auth.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendForgetPasswordEmail, sendResetPasswordSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mail/emails.js";
import crypto from "node:crypto"
import generateVerificationToken from "../utils/generateVerificationToken.js";


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

        // const verificationToken = (Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000).toString();
        const verificationToken = generateVerificationToken();

        const user = new User({
            username, 
            email, 
            password:hashedPassword,
            verificationToken:verificationToken,
            verificationTokenExpiresAt: Date.now() + 1*60*1000 // RESET TO 15 : TODO
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

export const resendOtp = async (req, res)=> {
    const {id} = req.body; 
    try {
        const user = await User.findOne({verificationTokenExpiresAt:{$lt:Date.now()}, _id:id})
        if (!user) {
            return res.status(400).json({success:false, message:"Can't Send New OTP"})
        }

        const verificationToken = generateVerificationToken();
        user.verificationToken = verificationToken;
        user.verificationTokenExpiresAt = Date.now() + 15*60*1000;       
        await user.save();
        await sendVerificationEmail(user.email, verificationToken)

        res.status(200).json({success:true, message:"OTP resent"})
        
    } catch (error) {
        console.log("Error resending otp: ", error.message)
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
export const forgotPassword = async (req, res)=> {
    const {email} = req.body;
    try {
        if (!email) {
            return res.status(400).json({success:false, message:"No email given"})
        }
        
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({success:false, message:"User not found"})
        }

        const resetToken = crypto.randomBytes(20).toString("hex")

        user.resetPasswordToken  = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 1*60*60*1000;
        
        await user.save()

        await sendForgetPasswordEmail(email, resetToken)

        res.status(200).json({success:true, message:"Password forgot request successful"})

    } catch (error) {
        console.log("Error is requesting forget password", error.message)
        res.status(500).json({success:false, message:error.message})
    }
}
export const resetPassword = async (req, res)=> {
    try {
        const {token} = req.params;
        const {password} = req.body;
        if (!password) {
            return res.status(400).json({success:false, message:"Empty Fields"})
        }
        const user = await User.findOne({resetPasswordToken:token, resetPasswordExpiresAt:{$gt:Date.now()}})
        if (!user) {
            return res.status(400).json({success:false, message:"Invalid or Expired Reset Password Token"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetPasswordSuccessEmail(user.email)

        res.status(200).json({success:true, message:"Password Reset Succesfully"})

    } catch (error) {
        console.log("Error in reseting password", error.message)
        res.status(500).json({success:false, message:error.message})
    }
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
