import mongoose from "mongoose"

async function connectdb(){
    try {
        
        const connect    = await mongoose.connect(process.env.MONGO_URI)

        console.log("db connetcted")
        return connect

    } catch (error) {
        throw new Error(error.message)
        
    }
}

export default connectdb