import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db.js';
import userRoutes from './routes/routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// DB Connection
connectDB();

// Routes
app.get('/', (req, res) => res.send('API Running'));
app.use('/api/v1', userRoutes);

export default app;
