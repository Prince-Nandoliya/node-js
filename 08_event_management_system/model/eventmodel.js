import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    eventName:{
        type:String,
        required:true,
        trim:true
    },
    eventDate:{
        type:Date,
        required:true
    },
    eventVenue:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    ticketPrice:{
        type:Number,
        required:true
    },
    eventBanner:{
        type:String,
        required:true
    },
    eventPoster:{
        type:[String],
        required:true
    },
    eventSpeaker:{
        type:[String],
        required:true
    }
    

},
{
    timestamps:true
})


const Event = mongoose.model("Event",eventSchema)

export default Event