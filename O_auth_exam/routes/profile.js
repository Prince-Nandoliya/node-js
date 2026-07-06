import express from "express"

import checkauth from "../middleware/checkauth.js"

const router = express.Router()


router.get("/",checkauth,(req,res)=>{
        console.log(req.user);

    res.render("profile",{user: req.user})
})

export default router