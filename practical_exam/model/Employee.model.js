import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const employeeScheme = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            trim: true,
        },
        Email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        Password: {
            type: String,
            required: true,
            validate: (value) => {
                if (value.toLowerCase() === "password") {
                    throw new Error("password can not set as a password");
                }
            },
        },
        Role: {
            type: String,
            enum: ["Employee", "admin"],
            default: "Employee",
        },
        Address: {
            type: String,
            required: true,
        },

        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,

    },
);

employeeScheme.pre("save", async function () {
    const employee = this;
    if (employee.isModified("Password")) {
        employee.Password = await bcrypt.hash(employee.Password, 10);
    }
});

employeeScheme.statics.findByCredential = async function (Email, Password) {
    try {
        const employees = await this.findOne({ Email });

        if (!employees) {
            throw new Error("unable to login");
        }

        const isMatched = await bcrypt.compare(Password, employees.Password);

        if (!isMatched) {
            throw new Error("unable to login");
        }

        return employees;
    } catch (error) {
        throw new Error(error.message);
    }
};

employeeScheme.methods.generateAuthToken = async function () {
    try {
        const employee = this;

        const token = jwt.sign(
            { _id: employee._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );

        if (!token) {
            throw new Error("failed to generate auth token");
        }

        employee.tokens = employee.tokens.concat({ token });

        await employee.save();

        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};






const Employee = mongoose.model("employee", employeeScheme);

export default Employee;