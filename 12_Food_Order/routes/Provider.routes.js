import express from "express"
import auth from "../middleware/auth.js"
import {document} from "../middleware/uploads.js"
import providerController from "../controller/provider.controller.js"

const router = express.Router()

router.post("/add",auth,document.array("document",3),providerController.addProvider)

export default router