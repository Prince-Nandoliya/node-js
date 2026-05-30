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

const getallEvent = async (req,res,next)=>{

    try {
        
        const EventData = await Event.find({})

        if(!EventData){
            return next (new HttpError("no EventData found",404))
        }

        res.status(200).json({success:true,total:EventData.length,message:"Event Data",EventData})

    } catch (error) {
        next(new HttpError(error.message,500))
        
    }

}

const getEvent = async (req,res,next)=>{

    try {

        const id = req.params.id

        const EventData = await Event.findById(id)

        if(!EventData){
            return next(new HttpError("no EventData found with this id",404))

        }

        res.status(200).json({sueccess:true,message:"Event data found successfully",EventData})
        
    } catch (error) {
        next(new HttpError(error.message,500))
    }
}

export default { addEvent,getallEvent,getEvent }