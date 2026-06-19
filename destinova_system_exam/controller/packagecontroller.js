import HttpError from "../middleware/httpError.js"
import Package from "../model/packagemodel.js"
import cloudinary from "../config/cloudinary.js"


const add = async (req, res, next) => {
    try {

        const { packageName, packagePrice, packageStartDate, packageEndDate } = req.body

        const newpackage = new Package({
            packageName,
            packagePrice,
            packageStartDate,
            packageEndDate,
            packageimg: req.file.path,
            cloudinary_id: req.file.filename
        })

        await newpackage.save()

        res.status(201).json({ success: true, message: "new package add successfully", newpackage })



    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const getall = async (req, res, next) => {

    const Packages = await Package.find({})
    if (Package.length <= 0) {
        return res(404).json({ success: false, message: "no package found" })
    }

    res.status(200).json({ success: true, message: "all package", Packages })
}

const deletepackage = async (req, res, next) => {
    try {

        const id = req.params.id

        const Packages = await Package.findById(id)

        if (!Packages) {
            res.status(404).json({ success: false, message: "no package found" })
        }

        await cloudinary.uploader.destroy(Packages.cloudinary_id)
        await Packages.deleteOne()

        res.status(200).json({ success: true, message: "package delete successfully" })


    } catch (error) {
        next(new HttpError(error.message))
    }
}

const updatepackage = async (req, res, next) => {
    try {

        const id = req.params.id

        const updatepackage = await Package.findById(id)

        if (!updatepackage) {

            res.status(404).json({ success: false, message: "fail to update" })
        }

        const update = Object.keys(req.body)

        const allowed = ["packageName", "packagePrice", "packageStartDate", "packageEndDate"]

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
export default { add, getall, deletepackage, updatepackage }