import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import employeesRoutes from './routes/employee.route.js';
import projectsRoutes from './routes/project.route.js';
import projectAssignmentRoutes from './routes/projectAssignment.route.js';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: __dirname + '/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/employees', employeesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/project_assignments', projectAssignmentRoutes);

// Database connection
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log('Connected to database!');
    app.listen(PORT, () => {
    console.log("Server is running on port 5000");
    });
}).catch((e) => console.log('Connection failed to database!' + e.message));

