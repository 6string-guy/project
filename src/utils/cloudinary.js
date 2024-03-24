import { v2 as cloudinary} from "cloudinary";
import fs from'fs'
cloudinary.config(
    {
        cloud_name:process.env.Cloud_name,
        api_key:process.env.API_key,
        api_secret:process.env.API_secret
    }
)
const uploadOnCloudinary=async (localFilePath)=>{
       try {
        if( !localFilePath)
        {
            return null;
        }
        //upload the file
       const response= await cloudinary.uploader.upload
       ( localFilePath,
            { resource_type:"auto" }
        )
        //File uploaded successfully
        console.log("File has been updated successfully on Cloudinary ", response.url)

           return response;
        
       } catch (error) {
        fs.unlinkSync(localFilePath)
        //because upload failed so we will de link the 
        //file from local storage 
        
       }
}


