import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";













// first approch to connect DB with backend
//
// import { express } from "express";
// const app= express();
// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONOGO_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{console.log("error",error)
//         throw error
//     })
//         app.listen(process.env.PORT || 8000,()=>{
//             console.log(`app is listening at port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error("Error", error)
//         throw error
//     }
// })()