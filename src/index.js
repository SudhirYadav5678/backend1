//require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./DB/index.js";
dotenv.config({path: './src/.env'});



connectDB() // when database connected it will give some call backs for connected server
.then(()=>{
    app.listen(`${process.env.PORT ||  8000}`, () =>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
    app.on("error",(error)=>{console.log("error in app listen",error)});//for handling any error in the application
    
})
.catch((error)=>{
    console.log("connection error in MOngoDb", error);
})







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