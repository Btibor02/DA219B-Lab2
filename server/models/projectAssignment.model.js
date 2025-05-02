import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    employee_id: { type: String, ref: 'Employee' },
    project_code: { type: String, ref: 'Project' },
    start_date: Date
});

const ProjectAssignment = mongoose.model("ProjectAssignment", assignmentSchema);
export default ProjectAssignment;