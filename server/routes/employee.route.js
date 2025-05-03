import express from 'express';
import employeeController from '../controllers/employee.controller.js';

const router = express.Router();

// Route to create a new employee
// POST /employee
router.post('/', employeeController.postNewEmployee);

export default router;