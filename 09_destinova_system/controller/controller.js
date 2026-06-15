import packages from "../model/destinovamodel.js"
import HttpError from "../middleware/HttpError.js"
import cloudinary from "../config/cloudinary.js"


const add = async (req, res, next) => {

    try {


        const { packageName, packagePrice, packagelocation, packageduration } = req.body

        if (!packageName || !packagePrice || !packagelocation || !packageduration) {
            return next(new HttpError("all the filed are required", 400))
        }

        const newpackage = new packages({
            packageName,
            packagePrice,
            packagelocation,
            packageduration,
            packageimg: req.file?.path,
            cloudinary_id: req.file.filename
        });

        await newpackage.save()

        res.status(201).json({ success: true, message: "new package added successfully", newpackage })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}


const getall = async (req, res, next) => {
    try {

        const Package = await packages.find({})

        if (Package.length <= 0) {
            return res(404).json({ success: true, message: "no package found" })
        }

        res.status(200).json({ success: true, total: Package.length, message: "package found", Package })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }

}

const getid = async (req, res, next) => {
    try {

        const id = req.params.id
        const Package = await packages.findById(id)

        if (!Package) {
            res.status(404).json({ success: true, message: "no package found with this id" })
        }

        res.status(200).json({ success: true, message: "package found successfully", Package })

    } catch (error) {
        next(new HttpError(error.message))

    }
}

const deletepackage = async (req, res, next) => {
    try {

        const id = req.params.id

        const Package = await packages.findById(id)

        if (!Package) {
            res.status(404).json({ success: false, message: "no package found" })
        }

        await cloudinary.uploader.destroy(Package.cloudinary_id)
        await Package.deleteOne()

        res.status(200).json({ success: true, message: "package delete successfully" })


    } catch (error) {
        next(new HttpError(error.message))
    }
}

const updatepackage = async (req, res, next) => {
    try {

        const id = req.params.id

        const updatepackage = await packages.findById(id)

        if (!updatepackage) {

            res.status(404).json({ success: false, message: "fail to update" })
        }

        const update = Object.keys(req.body)

        const allowed = ["packageName", "packagePrice", "packagelocation", "packageduration"]

        const isAllowed = update.every((field) =>
            allowed.includes(field)
        )

        if (!isAllowed) {
            return next(new HttpError("only allowed field can update", 400))
        }

        update.forEach((update) => {
            updatepackage[update] = req.body[update]
        })

        if (req.file) {
            await cloudinary.uploader.destroy(updatepackage.cloudinary_id)

            updatepackage.packageimg = req.file?.path
            updatepackage.cloudinary_id = req.file.filename
        }

        await updatepackage.save()

        res.status(200).json({ success: true, message: "package update successfully", updatepackage })
    } catch (error) {
        next(new HttpError(error.message))

    }
}
export default { add, getall, getid, deletepackage, updatepackage }