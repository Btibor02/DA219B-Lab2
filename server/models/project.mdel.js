import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    project_code: String,
    project_name: String,
    project_description: String
});

const Project = mongoose.model("Project", projectSchema);
export default Project;