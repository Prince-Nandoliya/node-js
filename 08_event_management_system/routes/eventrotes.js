import express from "express"

import uploads from "../middleware/uploads.js"

import eventController from "../controller/eventController.js"

const router = express.Router()

router.post("/add",uploads.fields([
    {
        name: "eventBanner",
        maxCount:1
    },
    {
        name:"eventPoster",
        maxCount:2
    },
    {
        name: "eventSpeaker",
        maxCount:2
    }
]),
eventController.addEvent,
);

router.get("/allEvent",eventController.getallEvent)

router.get("/:id",eventController.getEvent)

router.delete("/:id",eventController.deleteEvent)

export default router