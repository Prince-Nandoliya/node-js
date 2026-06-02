import fs from "fs"
import HttpError from "../middleware/HttpError.js";
import Event from "../model/eventmodel.js";

const addEvent = async (req, res, next) => {
    try {

        const { eventName, eventDate, eventVenue, description, ticketPrice } = req.body


        const eventBanner = req.files?.eventBanner?.[0]?.path || null
        const eventPoster = req.files?.eventPoster?.map((file) => file.path) || null
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

const getallEvent = async (req, res, next) => {

    try {

        const EventData = await Event.find({})

        if (!EventData) {
            return next(new HttpError("no EventData found", 404))
        }

        res.status(200).json({ success: true, total: EventData.length, message: "Event Data", EventData })

    } catch (error) {
        next(new HttpError(error.message, 500))

    }

}

const getEvent = async (req, res, next) => {

    try {

        const id = req.params.id

        const EventData = await Event.findById(id)

        if (!EventData) {
            return next(new HttpError("no EventData found with this id", 404))

        }

        res.status(200).json({ sueccess: true, message: "Event data found successfully", EventData })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}


const deleteEvent = async (req, res, next) => {

    try {

        const id = req.params.id

        const DeleteEvent = await Event.findById(id)

        if (!DeleteEvent) {
            next(new HttpError("falied to delete event", 404))
        }

        const fileDelete = [
            DeleteEvent.eventBanner,
            ...DeleteEvent.eventPoster,
            ...DeleteEvent.eventSpeaker,
        ]


        fileDelete.forEach((file) => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file)
            } else {
                return next(new HttpError("failed to delete file"))
            }
        })

        const deleteEvent = await Event.findByIdAndDelete(id)

        return res.status(200).json({ success: true, message: "Event deleted succeddfully" })

    } catch (error) {
        next(new HttpError(error.message, 500))

    }
}




const updateEvent = async (req, res, next) => {
    try {

        const id = req.params.id
      
        const EventData = await Event.findById(id)

        if(!EventData){
            return next(new HttpError("event not found with this id",404))

        }

        const updates = Object.keys(req.body)

        const allowedfiled  = [
            "eventName",
            "eventDate",
            "eventVenue",
            "description",
            "ticketPrice"
        ]

        const isValidUpdate = updates.every((filed)=>{
            return allowedfiled.includes(filed)
        });

        if(!isValidUpdate){
            return next(new HttpError("only allowfiled can be updated",400))

        }

        const eventBanner = req.files?.eventBanner?.[0]?.path || null
        const eventPoster = req.files?.eventPoster?.map((file) => file.path) || null
        const eventSpeaker = req.files?.eventSpeaker?.map((file) => file.path) || null
          
        if(eventBanner){
            if(fs.existsSync(EventData.eventBanner)){
                fs.unlinkSync(EventData.eventBanner)
            }

            EventData.eventBanner = eventBanner
        }

        if(eventPoster){
            EventData.eventPoster.forEach((file)=>{
                if(fs.existsSync(file)){
                    fs.unlinkSync(file)
                }
            })

            EventData.eventPoster = eventPoster
        }

        if(eventSpeaker){
            EventData.eventSpeaker.forEach((file)=>{
                if(fs.existsSync(file)){
                    fs.unlinkSync(file)
                }
            })

            EventData.eventSpeaker = eventSpeaker
        }

        updates.forEach((update)=>{
            EventData[update] = req.body[update]
        })
        await EventData.save()
        res.status(200).json({
            success:true,
            message:"Event update successfully",
            EventData
        })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

export default { addEvent, getallEvent, getEvent, deleteEvent,updateEvent }