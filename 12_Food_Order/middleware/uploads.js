import { CloudinaryStorage } from "multer-storage-cloudinary"

import multer from "multer"

import cloudinary from "../config/cloudinary.js"

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params:{
//         folder: "Food_Order",
//         allowedFormats: ["jpg","jpeg","webp","png"],
//         transformation:[
//             {
//                 height:"800",
//                 weight:"800",
//                 crop:"limit"
//             },{
//                 fetch_format:"webp"
//             },{
//                 quality:"auto"
//             },
//         ],
//     },
// });


// const uploads = multer({
//     storage,
//     limits:{
//         fileSize: 5* 1024 * 1024,
//     },
// })


const createUploadds = ({
    folder,
    transfomation = [],
    resource_type = "auto",
    fileSize = 1024 * 1024 * 5,
    allowed_formats = [],
    mimetype = [],
}) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: async (req, file) => {
            return {
                folder,
                transfomation,
                allowed_formats,
                resource_type
            }
        }
    })

    return multer({
        storage,
        limits: { fileSize },
        fileFilter: (req, file, cb) => {
            if (mimetype.length && !mimetype.includes(file.mimetype)) {
                return cb(
                    new Error(
                        `invalid file type, Allowed types: ${mimetype.join(", ")}`,
                    ),
                    false,
                );
            } else {
                cb(null, true)
            }
        }
    })
}


export const profilepic = createUploadds({
    folder: "12_Food_Order/profilepic",
    transfomation: [
        { height: "800", width: "800", crop: "limit" },
        { fetch_format: "webp" },
        { quality: "auto" },
    ],

    allowed_formats: ["jpeg", "jpg", "png", "webp"],
    mimetype: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
})


export const restaurant_img = createUploadds({

    folder: "12_Food_Order/restaurant_img",
    transfomation: [
        { height: "800", width: "800", crop: "limit" },
        { fetch_format: "webp" },
        { quality: "auto" },
    ],

    allowed_formats: ["jpeg", "jpg", "png", "webp"],
    mimetype: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
})

export const document = createUploadds({
        folder: "12_Food_Order/document",
        resource_type: "raw",
        allowed_formats: ["pdf"],
        mimetype: ["application/pdf"]

})

export const categoryImage = createUploadds({

     folder: "12_Food_Order/categoryImage",
    transfomation: [
        { height: "800", width: "800", crop: "limit" },
        { fetch_format: "webp" },
        { quality: "auto" },
    ],

    allowed_formats: ["jpeg", "jpg", "png", "webp"],
    mimetype: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
})