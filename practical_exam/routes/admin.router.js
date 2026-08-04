import express from "express";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import EmployeeController from "../controller/Employee.controller.js";

const router = express.Router();

router.delete(
  "/deleteEmployee/:id",
  auth,
  checkRole("admin"),
  EmployeeController.Delete
);
router.patch(
  "/UpdateEmployee/:id",
  auth,
  checkRole("admin"),
  EmployeeController.update
);

export default router;