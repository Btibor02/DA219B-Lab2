import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    employee: { 
        type: String,
        ref: 'Employee',
        required: true
    },
    project: { 
        type: String,
        ref: 'Project',
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now,
    }
});

const ProjectAssignment = mongoose.model("ProjectAssignment", assignmentSchema);
export default ProjectAssignment;