import HttpError from "../middleware/httpError.js"
import Package from "../model/packagemodel.js"


const add = async (req, res, next) => {
    try {

        const { packageName, packagePrice, packageStartDate, packageEndDate } = req.body

        const newpackage = new Package({
            packageName,
            packagePrice,
            packageStartDate,
            packageEndDate,
            packageimg: req.file.path
        })

        await newpackage.save()

        res.status(201).json({ success: true, message: "new package add successfully", newpackage })



    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const getall = async(req,res,next)=>{

    const Packages = await Package.find({})
    if(Package.length <= 0){
        return res(404).json({success:false,message:"no package found"})
    }

    res.status(200).json({success:true,message:"all package",Packages})
}
export default { add,getall }