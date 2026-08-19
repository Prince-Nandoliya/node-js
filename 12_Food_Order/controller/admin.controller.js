
import HttpError from "../middleware/HttpError.js"
import User from "../model/user.model.js"
import CheckRole from "../middleware/CheckRole.js"
import restaurant from "../model/restaurants.model.js"
import foodModel from "../model/Food.model.js"
import ordermodel from "../model/order.model.js"

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

const dashboard = async (req, res, next) => {
    try {

        //User
        const totaluser = await User.countDocuments()

        const totalcustomer = await User.countDocuments({ Role: "customer" })

        const totalprovider = await User.countDocuments({ Role: "provider" })

        const totalApprovedProvider = await User.countDocuments({ isVerified: true })

        const totalRejectedprovider = await User.countDocuments({ isVerified: false })


        //restaurant
        const totalRestaurant = await restaurant.countDocuments()

        const totalOpenRestaurant = await restaurant.countDocuments({ isOpen: true })

        const totalCloseRestaurant = await restaurant.countDocuments({ isOpen: false })

        //food
        const totalfood = await foodModel.countDocuments()

        const totalApprovedfood = await foodModel.countDocuments({ isVerified: true })

        const totalRejectedfood = await foodModel.countDocuments({ isVerified: false })

        const totalIsAvailableFood = await foodModel.countDocuments({ isAvailable: true })

        const totalIsNotAvailableFood = await foodModel.countDocuments({ isAvailable: false })


        const totalOrder = await ordermodel.countDocuments()

        const totalRevenue = await ordermodel.aggregate([
            {
                $group: {
                    _id: null,
                    revenue: { $sum: "$totalAmount" }

                }
            }
        ])



        res.status(201).json({
            success: true,
            message: "dashboard fetched successfully",
            totaluser,
            totalcustomer,
            totalprovider,
            totalApprovedProvider,
            totalRejectedprovider,
            totalRestaurant,
            totalOpenRestaurant,
            totalCloseRestaurant,
            totalfood,
            totalApprovedfood,
            totalRejectedfood,
            totalIsAvailableFood,
            totalIsNotAvailableFood,
        })
    } catch (error) {
        return next(new HttpError(error.message))

    }
}


export default { getAllUser, dashboard }