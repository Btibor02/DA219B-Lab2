import mongoose from 'mongoose';
import Employee from './models/employee.model.js';
import Project from './models/project.model.js';
import ProjectAssignment from './models/projectAssignment.model.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: __dirname + '/.env' });

// Connect to MongoDB and seed the database with initial data
async function seedData() {
  // Connect to MongoDB
  await mongoose.connect(process.env.CONNECTION_URL);

  // Create new employee, project, and project assignment models
  const employees = await Employee.insertMany([
    { employee_id: 'E01', full_name: 'Alice Johnson', email: 'alice@example.com', hashed_password: 'hashed1' },
    { employee_id: 'E02', full_name: 'Bob Smith', email: 'bob@example.com', hashed_password: 'hashed2' },
    { employee_id: 'E03', full_name: 'Charlie Day', email: 'charlie@example.com', hashed_password: 'hashed3' },
    { employee_id: 'E04', full_name: 'Dana White', email: 'dana@example.com', hashed_password: 'hashed4' },
    { employee_id: 'E05', full_name: 'Eve Black', email: 'eve@example.com', hashed_password: 'hashed5' }
  ]);

  const projects = await Project.insertMany([
    { project_code: 'P100', project_name: 'App Redesign', project_description: 'UI overhaul' },
    { project_code: 'P200', project_name: 'API Upgrade', project_description: 'Backend improvements' },
    { project_code: 'P300', project_name: 'Mobile Launch', project_description: 'Android/iOS release' },
    { project_code: 'P400', project_name: 'Analytics Setup', project_description: 'Tracking tools' },
    { project_code: 'P500', project_name: 'DevOps Pipeline', project_description: 'CI/CD implementation' }
  ]);

  await ProjectAssignment.insertMany([
    { employee_id: 'E01', project_code: 'P100', start_date: new Date() },
    { employee_id: 'E02', project_code: 'P200', start_date: new Date() },
    { employee_id: 'E03', project_code: 'P300', start_date: new Date() },
    { employee_id: 'E04', project_code: 'P400', start_date: new Date() },
    { employee_id: 'E05', project_code: 'P500', start_date: new Date() }
  ]);

  console.log('Seed data added!');
  process.exit();
}

seedData();
