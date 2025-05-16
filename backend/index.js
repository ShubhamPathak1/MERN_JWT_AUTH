import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js";
import userrouter from "./routes/user.route.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();


const app = express();

app.use(express.json())
app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))
app.use(cookieParser())

app.use("/api/auth", userrouter)

if(process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res)=> {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, ()=> {
    connectDB();
    console.log("Server started at port: ", PORT);
})