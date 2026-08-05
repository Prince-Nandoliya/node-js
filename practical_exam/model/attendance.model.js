import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const modelAttendance = mongoose.model("Attendance", attendanceSchema);

export default modelAttendance;