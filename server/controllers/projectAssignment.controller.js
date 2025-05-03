import ProjectAssignment from "../models/projectAssignment.model.js";
import Employee from "../models/employee.model.js";
import Project from "../models/project.model.js";

// This controller handles the assignment of projects to employees in a project management system.
const postAssignProject = async (req, res) => {
    try {

        // Validate request body
        const { employee_id, project_code } = req.body;

        // Check if employee_id and project_code are provided
        if (!employee_id || !project_code) {
            return res.status(400).json({ message: "Employee ID and Project Code are required" });
        }

        // Check if employee_id and project_code are valid
        const existingEmployee = await Employee.findOne({employee_id});
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const existingProject = await Project.findOne({ project_code });
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Create a new project assignment
        const newAssignment = new ProjectAssignment({
            employee: employee_id,
            project: project_code,
            start_date: req.body.start_date || new Date()
        });

        await newAssignment.save();

        res.status(201).json({ message: "Project assigned successfully", newAssignment });
    } catch (error) {
        res.status(500).json({ message: "Error assigning project", error });
    }
}

// This controller retrieves all project assignments from the database.
const getAllAssignments = async (req, res) => {
    try {
        // Fetch all project assignments
        const assignments = await ProjectAssignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching assignments", error });
    }
}

export default {
    postAssignProject,
    getAllAssignments
};