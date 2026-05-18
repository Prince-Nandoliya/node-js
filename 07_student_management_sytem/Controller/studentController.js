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

        res.status(200).json({ success: true, total: students.length, message: "student data fetced successfully",students })

    } catch (error) {
        next (new HttpError(error.message,500))

    }
}

export default {add,getAllStudentData}