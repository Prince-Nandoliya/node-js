import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({

    CustomerName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "model",
        required: true
    },
    Restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        required: true
    },
    FoodItems: [{
        food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "food",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    DeliveryAddress: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        match: /^[6-9]\d{9}$/,
    },
    orderStatus: {
        type: String,
        enum: [
            "pending",
            "confirmed",
            "preparing",
            "ready",
            "out_for_delivery",
            "delivered",
            "cancelled"
        ],
        default: "pending"
    }

}, { timestamps: true })

const ordermodel = mongoose.model("order",orderSchema)

export default ordermodel