import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employee_id: String,
    full_name: String,
    email: String,
    hashed_password: String
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;