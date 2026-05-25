import HttpError from "../middleware/HttpError.js";
import student from "../model/student.js";
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

const studentdelete = async function (req, res, next) {
  try {

    const id = req.params.id
    const Studentfind = await Student.findByIdAndDelete(id)

    if (!Studentfind) {
      return res.status(404).json({ success: false, message: "no student found" })
    }

    res.status(200).json({ success: true, message: "student delete successfully", Studentfind })
  } catch (error) {
    next(new HttpError(error.message, 500))
  }

}


const studentupdate = async function (req,res,next){
  try {
    
    const id = req.params.id
    const studentData = await student.findById(id)

    if(!studentData){
      return next(new HttpError("student not found with this id",404))

    }

    const update = Object.keys(req.body)

    const allowfields = ["name","email","moNumber"]

    const isValidUpdate = update.every((fields)=>
    allowfields.includes(fields))

    if(!isValidUpdate){
      return next(new HttpError("invalid update fields",404))
    }

    update.forEach((fields)=>{
      studentData[fields] = req.body[fields]
    })

    await studentData.save()

    res.status(200).json({success:true,message:"student update successfully",data:studentData})

  } catch (error) {
    res.status(500).json({message:error.message})
  }
}




export default { add, allStudentData, studentdelete,studentupdate };