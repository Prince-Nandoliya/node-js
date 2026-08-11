import User from "../model/user.model.js"
import HttpError from "../middleware/HttpError.js"
import providerModel from "../model/provider.model.js"
import sendEmail from "../utils/sendEmail.js"
import { WelComeEmailTemplate } from "../template/EmailTemplate.js"


const addProvider = async (req, res, next) => {
    try {

        
        const tragetUser = req.user._id

        const user = await User.findById(tragetUser)

        if (!user) {
            return next(new HttpError("user are not found", 404))
        }

        const exitstingPtovider = await providerModel.findOne({ providerName: req.user._id })

        if (exitstingPtovider) {
            return next(new HttpError("already provider registered with this id", 401))
        }

        const { restaurants, AccountNo } = req.body


        const newProvider = new providerModel({
            providerName: req.user._id,
            restaurants,
            AccountNo,
            document: req.files.map((file) => file.path),
            cloudinary_id: req.files.map((file) => file.filename)
        })

        User.Role = "Provider";
        await newProvider.save()


        await sendEmail({
            to:user.Email,
            subject:"Welcome to RoyalBite - Provider Account",
            html:WelComeEmailTemplate(user.Name,"provider")
        })


        const provider = await providerModel
            .findById(newProvider._id)
            .populate("providerName", "Name Email")
            .populate("restaurants", "restaurantName state city Address")

        res.status(201).json({
            success: true,
            message: "New Provider add",
            provider
        })
    } catch (error) {
        next(new HttpError(error.message,500))

    }
}

const updateProvider = async (req,res,next) => {
    try {
        
        const {id} = req.params
        const {restaurantName,AccountNo} = req.body


        const provider = await providerModel.findById(id)

        if(!provider){
            return next(new HttpError("provider not found",404))
        }

        if(restaurantName){
            provider.restaurantsName = restaurantName;
        }

        if(AccountNo){
            provider.AccountNo = AccountNo
        }

        if(req.files && req.files.length > 0){
            provider.document = req.files.map((file) => file.path);
            provider.cloudinary_id = req.files.map((file) => file.filename)
        }

        await provider.save()


        const updateProvider = await providerModel
        .findById(id)
        .populate("providerName","Name Email")


        res.status(200).json({success:true,message:"provider update Successfull",provider:updateProvider})
        
    } catch (error) {
        next(new HttpError(error.message))
    }
}


const deleteprovider = async (req,res,next) => {
    try {
        
        const {id} = req.params

        const provider = await providerModel.findById(id)

        if(!provider){
            return next(new HttpError("provider are not found",404))
        }

        await providerModel.findByIdAndDelete(id)

        res.status(200).json({success:true,message:"provider delete successfully"})

    } catch (error) {
        next(new HttpError(error.message))
    }
}

export default {addProvider,updateProvider,deleteprovider}