import express from "express";
import auth from "../middleware/auth.js";
import attendanceController from "../controller/attendance.controller.js";
const router = express.Router();

router.post("/MarkAttendance", auth, attendanceController.markAttendance);
router.get("/today", auth, attendanceController.TodayAttendance);

export default router;