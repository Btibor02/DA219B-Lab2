import express from 'express';
import projectAssignmentController from '../controllers/projectAssignment.controller.js';

const router = express.Router();

// Route to assign a project to an employee
// POST /project_assignments
router.post('/', projectAssignmentController.postAssignProject);

// Route to get all project assignments
// GET /project_assignments
router.get('/', projectAssignmentController.getAllAssignments);

export default router;