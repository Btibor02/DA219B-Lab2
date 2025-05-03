import Employee from '../models/employee.model.js';

// This function handles the creation of a new employee in the database.
const postNewEmployee = async (req, res) => {
    try {

        // Extracting employee details from the request body
        const { employee_id, full_name, email, hashed_password } = req.body;

        // Validating the presence of required fields
        if (!employee_id) {
            return res.status(400).json({ message: 'Employee ID is required' });
        }

        // Check if the employee ID already exists in the database
        const existingEmployee = await Employee.findOne({ employee_id });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee ID already exists' });
        }

        // Creating a new employee instance and saving it to the database
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