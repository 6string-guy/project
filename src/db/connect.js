import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import express from "express"
import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
})



//const app= express()

 
const connectDB= async  function()
{
    try {
    const connectionInstance=    await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    //console.log(connectionInstance)
    console.log( "ho gya database connection")
      
        
    } catch (error) {
        console.log( "Err",error)

        
        
    }
}
export default connectDB;