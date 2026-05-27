import fs from "fs"
import HttpError from "../middleware/HttpError.js";
import Event from "../model/eventmodel.js";

const Event = async (req,res,next)=>{
    try {

        const {eventName,eventDate,eventVenue,description,ticketPrice} = req.body
  
        const eventBanner = req.files.eventBanner?.[0]
        const eventPoster = req.files.eventPoster || []
        const eventSpeaker = req.files.eventSpeaker || []

        const newEvent = new Event({

            eventName,
            eventDate,
            eventVenue,
            description,
            ticketPrice,

            eventBanner: eventBanner?.path || null,
            eventPoster: eventPoster.map((file) => file.path) || null,
            eventSpeaker : eventSpeaker.map((file)=> file.path) || null
        })
        await newEvent.save()

        res.status(200).json({success:true,message:"Event added success",newEvent})



        
    } catch (error) {
        next(new HttpError(error.message,500))
    }
    
}

export default {Event}