
import jwt from "jsonwebtoken";

import HttpError from "./HttpError.js";
import Employee from "../model/Employee.model.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return next(new HttpError("auth header is required", 404));
    }
    const token = authHeader.replace("Bearer ", "");

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const employees = await Employee.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    

    if (!employees) {
      return next(new HttpError("Authentication failed", 404));
    }

    req.Employee = employees;
    req.token = token;

    next();
  } catch (error) {
    next(new HttpError("please authenticate", 401));
  }
};


export default auth;