import express from 'express';
import projectController from '../controllers/project.controller.js';

const router = express.Router();

// Route to create a new project
// POST /projects
router.post('/', projectController.postNewProject);

export default router;