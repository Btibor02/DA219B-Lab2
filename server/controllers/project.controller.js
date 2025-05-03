import Project from "../models/project.model.js";

// Function to handle the creation of a new project
const postNewProject = async (req, res) => {
    try {
        // Validate request body
        const { project_code, project_name, project_description } = req.body;

        // Check if required fields are provided
        if (!project_code) {
            return res.status(400).json({ message: "Project code is required" });
        }

        // Check if project code is unique
        const existingProject = await Project.findOne({ project_code });
        if (existingProject) {
            return res.status(400).json({ message: "Project code already exists" });
        }
        
        // Create a new project instance and save it to the database
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