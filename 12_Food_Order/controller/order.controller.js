import HttpError from "../middleware/HttpError.js"
import foodModel from "../model/Food.model.js"
import ordermodel from "../model/order.model.js"


const addOrder = async (req, res, next) => {
    try {

        const { DeliveryAddress, Restaurant, FoodItems, phone } = req.body

        const CustomerName = req.user._id;

        const foodid = FoodItems.map((FoodItems) => FoodItems.food)

        const food = await foodModel.find({
            _id: { $in: foodid }
        })

        let totalAmount = 0

        const orderItems = FoodItems.map((FoodItems) => {
           const foodfound = food.find((food)=>food._id.toString() === FoodItems.food.toString())

            const itemsTotal = foodfound.foodPrice * FoodItems.quantity;


            totalAmount += itemsTotal

            return {
                food: foodfound._id,
                quantity: FoodItems.quantity
            }
        })

        const neworder = await ordermodel.create({
            DeliveryAddress,
            FoodItems: orderItems,
            Restaurant,
            CustomerName,
            phone,
            totalAmount
        })

        res.status(201).json({ success: true, message: "order placed successfully", neworder })


    } catch (error) {
        next(new HttpError(error.message))

    }

}

export default { addOrder }