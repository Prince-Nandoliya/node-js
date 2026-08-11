
import HttpError from "../middleware/HttpError.js"
import User from "../model/user.model.js"
import CheckRole from "../middleware/CheckRole.js"

const getAllUser = async (req, res, next) => {
    try {

        const { Role, isVerified } = req.query

        let query = {}


        if (Role === "customer") {
            query = { Role: "customer" }

        }

        if (Role === "provider") {
            query = { Role: "provider" }

        }

        if (isVerified !== undefined) {
            query.isVerified = isVerified === "true"
        }

        const users = await User.find(query)


        if (users.length === 0) {
            return next(new HttpError("user not found", 404))
        }

        const alluser = await User.countDocuments(query)


        res.status(200).json({ success: true, message: "All user found successfully", alluser, users })


    } catch (error) {
        next(new HttpError(error.message, 500))

    }
}


export default { getAllUser }