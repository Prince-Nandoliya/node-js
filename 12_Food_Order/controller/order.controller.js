import ordermodel from "../model/order.model.js";
import HttpError from "../middleware/HttpError.js"
import foodModel from "../model/Food.model.js";


const add = async (req, res, next) => {
    try {
        const userId = req.user._id

        const { Restaurant, FoodItems, DeliveryAddress, phone } = req.body

        if (!FoodItems || FoodItems.length === 0) {
            return next(new HttpError("At least one foodItems is required", 400))
        }

        let totalAmount = 0;

        totalAmount += foodPrice * FoodItems.quantity


        const newOrder = await ordermodel({
            user: userId,
            Restaurant,
            FoodItems,
            totalAmount,
            DeliveryAddress,
            phone
        })

        await newOrder.save()

        res.status(201).json({
            success: true,
            message: "order placed successfully",
            newOrder
        })
    } catch (error) {
        next(new HttpError(error.message, 500))

    }
}

export default { add }