import mongoose from "mongoose";

async function connected(){
    try{
        const connect = await mongoose.connect(
            "mongodb://localhost:27017/studentManagementsytem",
        );

        console.log("db connected")
        return connect;
    }catch(Error){
        console.log(Error.message)
    }
}

export default connected;
