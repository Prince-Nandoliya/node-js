import express from "express"


const app = express()

app.use(express.json())


const tasklist = [
    {id: 1,task: "play", message :"i am playing free fire"},
    {id: 2,task: "play", message: "i am playing gta 5"}
]

app.get("/",(req,res)=>{
    res.send("hello form server")
})

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
            .json({ success: true, message: "no task data found with this id" })
    }
    res.status(200).json({ success: true, message: "task found", task })
})


app.post("/addTask",(req,res,next)=>{
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


app.patch("/update",(req,res,next)=>{
    const id = Number(req.params.id)

    const findId = tasklist.find((t) => t.id === id)

    if(!findId){
        return next(new HttpError("task not found"))
    }

    const {task,message} = req.body


})



app.delete("/tasklist/:id",(req,res,next)=>{
    const id = Number(req.params.id)

    const index = tasklist.findIndex((t)=> t.id === id)

    if(index === -1){
        return next(new HttpError("requested route not found",404))
    }

    tasklist.splice(index,1)

    res.status(200).json({
        success:true,
        message: "task data deleted successfully"
    })
})



app.put("/updateTask/:id",(req,res,next)=>{
    const id = Number(req.params.id)

    const taskDataindex = tasklist.findIndex((t)=> t.id === id)

    if(taskDataindex === -1){
        return next(new HttpError("task data not found with this id",404))
    }
    const{task,message} = req.body

    if(!task || !message){
        return next(new HttpError("task or message is required",400))
    }

    tasklist[taskDataindex] = {...tasklist[taskDataindex],task,message}

    res.status(200).json({success:true,message:"task data update successfully",updateTask:tasklist[taskDataindex]})
})



const port = 5000

app.listen(port,(err)=>{
    if(err){
        return console.log(err)
    }

    console.log(`server running on port ${port}`)
})
