import fs from "fs"
import HttpError from "../middleware/HttpError.js";
import Event from "../model/eventmodel.js";

const addEvent = async (req, res, next) => {
    try {

        const { eventName, eventDate, eventVenue, description, ticketPrice } = req.body


        const eventBanner = req.files?.eventBanner?.[0]?.path || null
        const eventPoster = req.files?.eventPoster?.map((file)=> file.path) || null
        const eventSpeaker = req.files?.eventSpeaker?.map((file) => file.path) || null


        const newEvent = new Event({

            eventName,
            eventDate,
            eventVenue,
            description,
            ticketPrice,
            eventBanner,
            eventPoster,
            eventSpeaker    


        })
        await newEvent.save()

        res.status(200).json({ success: true, message: "Event added success", newEvent })




    } catch (error) {
        next(new HttpError(error.message, 500))
    }

}

export default { addEvent }