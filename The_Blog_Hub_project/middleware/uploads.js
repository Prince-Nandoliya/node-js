import {CloudinaryStorage} from "multer-storage-cloudinary"

import multer from "multer"

import cloudinary from "../config/cloudinary.js"

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"The_Blog_Project",
        allowedFormats: ["jpg","jpeg","png","webp"],
        transformation:[
            {
                height:"800",
                weight:"800",
                crop:"limit"
            },{
                fetch_format:"webp"
            },{
                quality:"auto"
            },
        ],
    },
});

const uploads = multer({
    storage,
    limits:{
        fieldSize : 5 * 1024 * 1024,
    },
})

export default uploads