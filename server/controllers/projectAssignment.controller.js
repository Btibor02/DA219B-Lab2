import ProjectAssignment from "../models/projectAssignment.model";
import Employee from "../models/employee.model";
import Project from "../models/project.model";

const postAssignProject = async (req, res) => {
    try {
        const { employee_id, project_code } = req.body;

        if (!employee_id || !project_code) {
            return res.status(400).json({ message: "Employee ID and Project Code are required" });
        }

        const existingEmployee = await Employee.findOne(employee_id);
        if (!existingEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const existingProject = await Project.findOne({ project_code });
        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        const newAssignment = new ProjectAssignment({
            employee_id,
            project_code
        });

        await newAssignment.save();

        res.status(201).json({ message: "Project assigned successfully", newAssignment });
    } catch (error) {
        res.status(500).json({ message: "Error assigning project", error });
    }
}

const getAllAssignments = async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find().populate('employee_id').populate('project_code');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching assignments", error });
    }
}

export default {
    postAssignProject,
    getAllAssignments
};