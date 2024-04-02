import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

// this pre is a mongoose middleware which check password encryption before save  the user to database.
userSchema.pre( 'save', async function (next) {
    if (this.isModified("password")){ // check if the password has been modified 
        this.password = await bcrypt.hash(this.password, 8); // bcrypt  hash the password with salt rounds of 8
        next();}
})

// mongoose  method for compare input password with saved one in db comparison is done by  using bcrypt.compare()
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password)} // bcrypt provide compare to campare password.


userSchema.methods.generateAccessToken=function(){
     return jwt.sign({// payload 
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName:this.fullName, // sign with JWT secret and set expiration time
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY 
    })
}


userSchema.methods.generateRefreshToken=function(){return jwt.sign({// payload 
    _id:this._id,
},
process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY 
})}


export const User = mongoose.model("User", userSchema)