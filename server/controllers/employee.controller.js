import Employee from '../models/employee.model.js';

const postNewEmployee = async (req, res) => {
    try {
        const { employee_id, full_name, email, hashed_password } = req.body;

        if (!employee_id) {
            return res.status(400).json({ message: 'Employee ID is required' });
        }

        const existingEmployee = await Employee.findOne({ employee_id });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee ID already exists' });
        }

        const newEmployee = new Employee({ employee_id, full_name, email, hashed_password });
        await newEmployee.save();

        res.status(201).json({ message: "Employee created successfully", newEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
};

export default {
    postNewEmployee,
};