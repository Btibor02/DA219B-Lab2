import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: __dirname + '/.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (optional: to parse JSON)
app.use(express.json());

// Database connection
mongoose.connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log('Connected to database!');
    app.listen(PORT, () => {
    console.log("Server is running on port 5000");
    });
}).catch((e) => console.log('Connection failed to database!' + e.message));

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
