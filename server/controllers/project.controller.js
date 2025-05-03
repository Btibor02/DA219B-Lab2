import Project from "../models/project.model.js";

const postNewProject = async (req, res) => {
    try {
        const { project_code, project_name, project_description } = req.body;

        if (!project_code) {
            return res.status(400).json({ message: "Project code is required" });
        }

        const existingProject = await Project.findOne({ project_code });
        if (existingProject) {
            return res.status(400).json({ message: "Project code already exists" });
        }
        

        const newProject = new Project({
            project_code,
            project_name,
            project_description
        });
        await newProject.save();
        
        res.status(201).json({ message: "Project created successfully", newProject });
    } catch (error) {
        res.status(500).json({ message: "Error creating project", error });
    }
}

export default {
    postNewProject,
};