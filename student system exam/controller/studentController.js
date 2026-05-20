import HttpError from "../middleware/HttpError.js";
import Student from "../model/student.js";

const add = async (req, res) => {
  try {
    const { name, grId, email, course, isActive, moNumber } = req.body;

    const student = new Student({
      name,
      grId,
      email,
      course,      
      moNumber,
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const allStudentData = async (req, res, next) => {

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

const studentdelete = async function (req,res,next) {
try {
    
    const id = req.params.id
    const Studentfind = await Student.findByIdAndDelete(id)

    if(!Studentfind){
        return res.status(404).json({success:false,message:"no student found"})
    }

    res.status(200).json({success:true,message:"student delete successfully",Studentfind})
} catch (error) {
    next(new HttpError(error.message, 500))
}
    
}




export default { add,allStudentData,studentdelete };