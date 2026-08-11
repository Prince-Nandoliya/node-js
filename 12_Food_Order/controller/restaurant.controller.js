import restaurant from "../model/restaurants.model.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js"
import sendEmail from "../utils/sendEmail.js"
import { WelComeEmailTemplate } from "../template/EmailTemplate.js";


const add = async (req, res, next) => {
    try {
        const { restaurantName, description, state, city, Address, openTime, closeingTime, isOpen } = req.body

        const newrestaurnat = new restaurant({
            restaurantName,
            description,
            state,
            city,
            Address,
            owner: req.user._id,
            openTime,
            closeingTime,
            isOpen,
            restaurant_img: req.file?.path,
            cloudinary_id: req.file.filename
        })

        await newrestaurnat.save()


        await sendEmail({
            to: req.user.Email,
            subject: "Restaurant Add success fully in RoyalBite",
            html: WelComeEmailTemplate(
                newrestaurnat.restaurantName,
                "restaurant"

            )
        })

        res.status(201).json({ success: true, message: "restaurant add successfully", newrestaurnat })


    } catch (error) {
        next(new HttpError(error.message))
    }
};

const Delete = async (req, res, next) => {
    try {

        const targetuser = req.params.id;

        const restaurantData = await restaurant.findById(targetuser)



        if (restaurantData.cloudinary_id) {
            await cloudinary.uploader.destroy(restaurantData.cloudinary_id)
        }


        await restaurant.deleteOne();

        res.status(200).json({ success: true, message: "restaurant delete successfully" })
    } catch (error) {
        next(new HttpError(error.message))
    }
}

const getall = async (req, res, next) => {
    try {

        let { page = 1, limit = 10, isOpen, serch, city, sort = "createdAt", order = "desc" } = req.query

        page = Number(page)

        limit = Number(limit)

        const filter = {}

        if (serch) {
            filter.restaurantName = {
                $regex: serch,
                $options: "i"
            }
        }

        if (isOpen !== undefined) {
            filter.isOpen = isOpen === "true"
        }
        if (city) {
            filter.city = city
        }

        const sortOption = () => {
            [sort] = "asc" ? 1 : -1;
        }

        const totalrestaurant = await restaurant.countDocuments(filter)

        const restaurants = await restaurant.find(filter).populate("owner", "Name Email -_id").skip((page - 1) * limit).limit(limit).lean()

        if (restaurants.length === 0) {
            res.status(404).json({ success: false, message: "restaurant not found" })
        }

        res.status(200).json({
            success: true, message: "restaurant founds", totalrestaurant: totalrestaurant, totalPages: Math.ceil(totalrestaurant / limit),
            page: page, restaurants
        })


    } catch (error) {
        next(new HttpError(error.message))
    }
}


const update = async (req, res, next) => {
    try {

        const restaurantData = await restaurant.findById(req.params.id)

        if (!restaurantData) {
            return next(new HttpError("restaurant not found", 404))
        }

        const updates = Object.keys(req.body)

        const allowField = [
            "restaurantName",
            "description",
            "state",
            "city",
            "Address",
            "openTime",
            "closeingTime"
        ]

        const isValidUpdate = updates.every((field) =>
            allowField.includes(field)
        )

        if (!isValidUpdate) {
            return next(new HttpError("only allowField can be updated", 400))
        }

        if (req.file) {
            if (restaurantData.cloudinary_id) {
                await cloudinary.uploader.destroy(restaurantData.cloudinary_id)
            }

            restaurantData.restaurant_img = req.file.path
            restaurantData.cloudinary_id = req.file.filename
        }

        updates.forEach((field) => {
            restaurantData[field] = req.body[field]
        })

        await restaurantData.save()

        res.status(200).json({ success: true, message: "restaurant update successfully", restaurantData })

    } catch (error) {
        next(new HttpError(error.message))
    }
}

export default { add, Delete, getall, update }