import { asyncHandler } from "../utilies/asyncHandler.js";

const registerUser= asyncHandler(async (req,res)=>{
     await res.status(201).json({
        message:"successfully register user"
} )
});

export {registerUser}