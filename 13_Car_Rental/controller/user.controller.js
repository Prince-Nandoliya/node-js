import User from "../model/user.model.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
    try {

        const { Name, Email, Password, Address, Phone } = req.body

        const newUser = await User({
            Name,
            Email,
            Password,
            Address,
            Phone
        })

        await newUser.save()

        res.status(201).json({ success: true, message: "new add successfully", newUser })

    } catch (error) {
        next(new HttpError(error.message))

    }
}

const getall = async (req, res, next) => {
    try {

        const alluser = await User.find({})

        if (!alluser) {
            next(new HttpError("user data are not found"))
        }

        res.status(200).json({ success: true, total: alluser.length, message: "user Data found successfully", alluser })

    } catch (error) {
        next(new HttpError(error.message))
    }
}

export default { add, getall }