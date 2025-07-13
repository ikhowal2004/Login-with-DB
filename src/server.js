import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/routes.js'; // ✅ Correct path (not routes.js)
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
app.use(cors());

const app = express();
const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const MONGO_URI = 'mongodb://localhost:27017/Test1'; 
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/v1', userRoutes);

// ✅ Optional route to serve login page directly at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
