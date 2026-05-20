import HttpError from "../middleware/HttpError.js";
import Student from "../model/student.js";

const add = async (req, res, next) => {
    try {
        const { name, grid, email, course, isActive, mobileNumber } = req.body

        const newStudent = await new Student({
            name,
            grid,
            email,
            course,
            isActive,
            mobileNumber,
        })

        await newStudent.save()

        res.status(201).json({
            success: true,
            message: "student data added successfully",
            newStudent,
        })
    } catch (error) {
        next(new HttpError(error.message, 500))

    }
};


const getAllStudentData = async (req, res, next) => {

    try {
        const students = await Student.find({})

        if (students.length <= 0) {
            return res.status(200).json({ success: true, message: "no student data found" })
        }

        res.status(200).json({ success: true, total: students.length, message: "student data fetced successfully", students })

    } catch (error) {
        next(new HttpError(error.message, 500))

    }
}

const deletestudent = async (req, res) => {
    try {
        const id = req.params.id
        const student = await Student.findByIdAndDelete(id)

        if (!student) {
            res.status(404).json({ success: false, message: "no student found" })
        }
       return res.status(200).json({ success: true, message: "student delte succesfully" })

    } catch (error) {

        res.status(500).json({
            message: error.message
        })
    }

}

const updatestudent = async (req, res, next) => {
    try {

        const id = req.params.id
        const student = await Student.findById(id)

        if (!student) {
            return next(new HttpError("student not found with this id", 404))
        }
        const update = Object.keys(req.body)

        const allowfields = ["name","email","mobileNumber"]

        const isValidUpdate = update.every((fields)=>
        allowfields.includes(fields)
        );

        if(!isValidUpdate){
            return next(new HttpError("invalid update fields",404))
        }

        update.forEach((fields)=>{
            student[fields] = req.body[fields]
        })

        await student.save()

        res.status(200).json({success:true,message: "student update successfully",data:student})


    } catch (error) {
        res.status(500).json({message: error.message})

    }
}







export default { add, getAllStudentData, deletestudent,updatestudent }