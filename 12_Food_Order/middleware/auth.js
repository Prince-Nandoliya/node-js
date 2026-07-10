import jwt from "jsonwebtoken"
import HttpError from "../middleware/HttpError.js"
import user from "../model/user.model.js"


const auth = async function (req, res, next) {
    try {

        const authHeader = req.header("Authorization")

        if (!authHeader) {
            return next(new HttpError("auth header is required", 400))
        }

        const token = authHeader.replace("Bearer ", "")





        const decoded = jwt.verify(token, process.env.JWT_SECRET)


        const users = await user.findOne({
            _id: decoded._id,
            "tokens.token": token
        })


        if (!users) {
            return next(new HttpError("authentication fail", 401))
        }

        req.user = users
        req.token = token

        next()

    } catch (error) {

        next(new HttpError(error.message))
    }

}


export default auth