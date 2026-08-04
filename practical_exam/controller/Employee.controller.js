import HttpError from "../middleware/HttpError.js";
import Employee from "../model/Employee.model.js";

const add = async (req, res, next) => {
    try {
        const { Name, Email, Password, Role, Address, } = req.body;

        const newEmployee = await Employee({
            Name,
            Email,
            Password,
            Role,
            Address,
        });

        await newEmployee.save();

        res
            .status(201)
            .json({ success: true, message: "new Employee added successfully", newEmployee });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    const employees = await Employee.findByCredential(Email, Password);

    if (!employees) {
      return next(new HttpError("Employee note found", 404));
    }

    const token = await employees.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "employee login successfully",
      employees,
      token,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAll = async (req, res, next) => {
  try {
    const Employees = await Employee.find({});

    if (Employees.length === 0) {
      return next(new HttpError("Employee  not found", 404));
    }

    res.status(200).json({
      success: true,
      message: "All Employee found successfully",
      Total: Employees.length,
      Employees,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const Employee = req.Employee;

    if (!Employee) {
      return next(new HttpError("Employee note found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "Auth login successfully", Employee });
  } catch (error) {}
};

const logout = async (req, res, next) => {
  try {
    const Employee = req.Employee;

    Employee.tokens = Employee.tokens.filter((t) => t.token != req.token);
    await Employee.save();

    res
      .status(200)
      .json({ success: true, message: "Employee logout successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};


const logoutall = async (req, res, next) => {
  try {
    req.Employee.tokens = [];

    await req.Employee.save();

    res.status(200).json({
      success: true,
      message: "Employee logout from all device successfully",
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};


const Delete = async (req, res, next) => {
  try {
    const targetedUser = req.params.id || req.Employee._id;

    const employees = await Employee.findById(targetedUser);

  

    await employees.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Employee  delete successfully" });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const update = async (req, res, next) => {
  try {
    const targetedUser = req.params.id || req.Employee._id;

    const employees = await Employee.findById(targetedUser);

    const updates = Object.keys(req.body);

    let allowedFiled = ["Name", "Address"];

    
    const isValidUpdate = updates.every((filed) => {
      return allowedFiled.includes(filed);
    });

    if (!isValidUpdate) {
      return next(new HttpError("only allowed filed can update", 404));
    }


    updates.forEach((update) => {
      employees[update] = req.body[update];
    });

    await employees.save();

    res.status(200).json({
      message: "Employee  updated successfully",
      employees,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};






export default {add,login,getAll,authLogin,logout,logoutall,Delete,update}