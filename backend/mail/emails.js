import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
import dotenv from "dotenv"

dotenv.config();

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sender = '"MERNAUTH NEW" <pathak.shubham010101@gmail.com>'

export const sendVerificationEmail = async (email, verificationCode)=> {
    try {      
        const info = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Verify your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCode).replace("{verifyURL}", `${process.env.CLIENT_URL}/verify-otp`)
        });
        
        console.log("Verification Email sent:", info.messageId);
    } catch (error) {
        console.log("Error sending verification email: ", error)
        throw new Error("Error sending verification email", error)
    }
}

export const sendWelcomeEmail = async (username, email)=> {
    try {      
        const info = await transporter.sendMail({
            from: sender,
            to: email,
            subject: `Welcome ${username}`,
            html: WELCOME_EMAIL_TEMPLATE.replace("{username}", username)
        });
        
        console.log("Welcome Email sent:", info.messageId);
    } catch (error) {
        console.log("Error sending welcome email: ", error)
        throw new Error("Error sending welcome email", error)
    }
}

