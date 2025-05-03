import express from 'express';
import employeeController from '../controllers/employee.controller';

const router = express.Router();

// Route to create a new employee
// POST /employee
router.post('/employee', employeeController.postNewEmployee);

export default router;