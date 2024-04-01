import { express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential:true,
}))
// configuration for accepting  json data in request body and url
app.use(express.json({limit:"500kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

// cookies configurations
app.use(cookieParser())

export {app}