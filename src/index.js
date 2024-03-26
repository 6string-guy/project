import mongoose  from "mongoose";
import app from "./app.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
})


connectDB().then(
    ()=>{
        app.listen(process.env.PORT ||8000,()=>{
            console.log("sun rha hai " ,process.env.PORT  )
        })
       // app.get("/", ()=>(console.log("SANSKAR")))
    }
)
.catch(
    (error)=>{
        console.log( "Nhi Hua Connection!!! ", error)
    }

)
