import { asyncHandler } from "../utilies/asyncHandler.js";
import {ApiError} from "../utilies/ApiError.js"
import {User} from "../models/userModel.js";
import {upuploadOnCloudinaryl} from "../utilies/cloudinary.js"
import {ApiResponse} from "../utilies/apiResponce.js"

const registerUser= asyncHandler(async (req,res)=>{
     // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const {fullName, username, email, password}=req.body //req.body get data from  form or json
    console.log("email",email, "username",username);
//     if (fullName ==="") {
//         throw new ApiError(400,"fullname is required")
//     }
        if ([fullName, email, username, password].some((fields)=> fields?.trim === "")) {
                throw new ApiError(400,"Please fill all the fields");
        }

        //already existed user can check from "users" due users creates with mongoose
        const existedUser=User.findOne({$or:[{email}, {username}]})
        if (existedUser) {
                throw new ApiError(409,"User  Already Exists! Please Login Instead.")
        };

        //files uploading with  multer "files" and express req
        const avatarLocalPath=req.files?.avatar[0]?.path;   //multer gives path of uploaded file
        console.log(req.files);
        const coverImageLocalPath=req.files?.coverImage[0]?.path;
        if (!avatarLocalPath) {
                throw new ApiError(400,"avatar is required")
        }
        
        //files upload om cloudinary
        const avatar=await upuploadOnCloudinaryl(avatarLocalPath)
        const coverImage=await upuploadOnCloudinaryl(coverImageLocalPath)
        if (!avatar) {
                throw new ApiError(400,"avatar is required")
        }

        // data upload on dataBase 
        const user= await User.create({
                fullName,
                avatar: avatar.url,
                coverImage:coverImage.url || "",
                email,
                username:username.toLowerCase(),
                password
        })
        // check for entry in db
        const createdUser=await User.findById(user._id).select("-password -refreshToken")
        if (!createdUser) {
                throw new ApiError(500,"user not in db") 
        }

        return res.status(201,).json(
                new ApiResponse(200, createdUser, "User registered successfully")
        )
});

export {registerUser}