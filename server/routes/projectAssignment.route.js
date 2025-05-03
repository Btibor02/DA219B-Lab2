import express from 'express';
import projectAssignmentController from '../controllers/projectAssignment.controller';

const router = express.Router();

// Route to assign a project to an employee
// POST /project_assignments
router.post('/project_assignments', projectAssignmentController.postAssignProject);

// Route to get all project assignments
// GET /project_assignments
router.get('/project_assignments', projectAssignmentController.getAllAssignments);

export default router;