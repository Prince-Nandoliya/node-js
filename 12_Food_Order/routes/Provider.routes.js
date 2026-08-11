import express from "express"
import auth from "../middleware/auth.js"
import {document} from "../middleware/uploads.js"
import providerController from "../controller/provider.controller.js"
import CheckRole from "../middleware/CheckRole.js"
import checkRole from "../middleware/CheckRole.js"

const router = express.Router()

router.post("/add",auth,document.array("document",3),providerController.addProvider)

router.patch("/updateprovider/:id",auth,checkRole("admin"),document.array("document",3),providerController.updateProvider)

router.delete("/deleteprovider/:id",auth,checkRole("admin"),providerController.deleteprovider)

export default router