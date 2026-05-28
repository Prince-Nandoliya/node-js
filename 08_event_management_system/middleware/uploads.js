import multer from "multer";
import fs from "fs";
import HttpError from "./HttpError.js";



const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        let folderName = "uploads/";


        if (file.fieldname === "eventBanner") {
            folderName += "eventBanner"
        } else if (file.fieldname === "eventPoster") {
            folderName += "eventPoster"
        } else if (file.fieldname === "eventSpeaker") {
            folderName += "eventSpeaker"
        } else {
            folderName = "others"
        }

        fs.mkdirSync(folderName, {
            recursive: true
        });

        cb(null, folderName)       
    },
     filename: (req,file,cb)=>{
            const uniqueName = `${Date.now()} - ${file.originalname} - ${file.fieldname}`

            cb(null,uniqueName)
        }

})

const fileFilter = (req,file,cb)=>{
    const allowfiletype =[
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/pdf"
    ];

    if(!allowfiletype.includes(file.mimetype)){
        return cb(new HttpError("invaild file type",400),false)
    }
    cb(null,true)
} 

const uploads = multer({
    storage,
    fileFilter,
    limits:{ fileSize : 20 * 1024 * 1024},
})

export default uploads

