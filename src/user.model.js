import mongoose,{nanoid, Schema} from "mongoose";
import jwt from "jsonwebtoken";  //json webtocken    jwt is bearer token
import bcrypt from 'bcrypt'


const userSchema=new Schema(
{
   username:{
    typeof:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true //index ==true for optimisation while searching
   },
   email:{
    typeof:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
   },
   fullname:{
    typeof:String,
    required:true,
    unique:true,
    
    trim:true,
    index:true
   },
   avatar:{
    type:String,// cloudnary url
    required:true
   },
   coverImage:{
    type:String,// cloudnary url
   
   },
   watchHistory:[
    {
        typrof:Schema.Types.ObjectId,
        ref:"Video"
    }
   ],
   password:{
    type:String,
    required:[true, "Password is Required"]

   }
   ,
   requiredToken:{
    type:String,

   }

}
,{timestamps:true}
);

//PreHook--> kisi even tse pehele kuch execute kaarne ke liye 
userSchema.pre("save", async function(next)
    {
        if( this.isModified("password"))
        {
            this.password= await bcrypt.hash(this.password, 10);
        }
        
        next()
    }
)
userSchema.methods.isPasswordCorrect=async function(password)
{
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken=function()
{
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRequestToken=function()
{
    return jwt.sign(
        {
            _id:this._id,
          
        },
        process.env.REQUEST_TOKEN_SECRET,
        {
            expiresIn:process.env.REQUEST_TOKEN_EXPIRY
        }
    )
}
export  const User=mongoose.model("User", userSchema);