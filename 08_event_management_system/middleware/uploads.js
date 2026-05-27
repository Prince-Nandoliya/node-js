import multer from "multer";
import fs from "fs";



const storage = multer.storage({

    destination:(req,res,cb)=>{

        let folderName = "uploads/";


        if(file.fieldname === "eventBanner"){
            folderName += "eventBanner"
        }else if(file.fieldname === "eventPoster"){
            folderName += "eventPoster"
        }else if(file.fieldname === "eventSpeaker"){
            folderName += "eventSpeaker"
        }else{
            folderName = "others"
        }

        fs.mkdirSync(folderName,{
            recursive:true
        });

        cb (null,folderName)
    }
})