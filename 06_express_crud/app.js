import express from "express"
import HttpError from "./middleware/HttpError.js";

const app = express();

const tasklist = [
    { id: 1, task: "error handling", message: "Implement custom error handling using HttpError" },
    { id: 2, task: "learn middleware", message: "Understand how middleware works in Express" },
    
]


app.get("/", (req, res) => {
    res.send("hello from server")
})
//read
app.get("/tasklist", (req, res) => {
    res.status(200).json({
        success: true,
        message: "task list",
        tasklist
    })
})


app.get("/task/:id", (req, res) => {
    const id = Number(req.params.id)


    const task = tasklist.find((t) => t.id === id)
    if (!task) {
        return res
            .status(404)
            .json({ success: true, message: "no taskdata found with this id" })
    }
    res.status(200).json({ success: true, message: "task found", task })
})

//create

app.post("/addtask",(req,res,next)=>{
    const{task,message} = req.body  

    if(!task || !message){
        return next( new HttpError("task or message are required",400))
    }
    const newTask = {
        id:new Date().getTime(),
        task,
        message,
    }

    tasklist.push(newTask)

    res.status(201).json({success:true,message:"new task added successfully",newTask})

})

const port = 5000;

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log(`server is runing on port${port}`)
})

