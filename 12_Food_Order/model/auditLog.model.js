import mongoose from "mongoose"

const auditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "model",
        required: true
    },
    module: {
        type: String,
        required: true
    },
    targetedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "model",
        required: true
    },
    Ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    }
})

const auditLog = mongoose.model("audit", auditLogSchema)

export default auditLog