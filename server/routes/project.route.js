import express from 'express';
import projectController from '../controllers/project.controller';

const router = express.Router();

// Route to create a new project
// POST /projects
router.post('/projects', projectController.postNewProject);

export default router;