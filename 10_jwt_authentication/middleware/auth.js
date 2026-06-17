import jwt from "jsonwebtoken"
import HttpError from "./HttpError.js"
import users from "../model/usermodel.js"

const auth = async function (req, res, next) {
    try {

        const authHeader = req.header("Authorization")

        console.log("authheader", authHeader)

        if (!authHeader) {
            return next(new HttpError("auth header is required", 401))
        }

        const token = authHeader.replace("Bearer ", "")

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await users.findOne({
            _id: decoded._id,
            "tokens.token": token,
        })

        if (!user) {
            return next(new HttpError("authentication fail", 401))
        }

        req.user = user

        req.token = token

        next()


    } catch (error) {
        next(new HttpError(error.message))

    }
}

export default auth