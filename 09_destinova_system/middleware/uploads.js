import {CloudinaryStorage } from "multer-storage-cloudinary"

import multer from "multer"

import cloudinary from "../config/cloudinary.js"

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "destinova",
        allowedFormats: ["jpg","png","webp","jpeg"],
        transformation:[
            {
                height:800,
                width:800,
                crop:"limit"
            },{
                fetch_format: "webp"
            },{
                quality:"auto"
            },
        ],
    },
});

const uploads = multer({
    storage,
    limits:{
        fileSize: 5 * 1024 * 1024,
    },
})

export default uploads