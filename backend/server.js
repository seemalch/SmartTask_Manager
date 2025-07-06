import express from 'express';
    import mongoose from 'mongoose';
    import cors from 'cors';
    import dotenv from 'dotenv';
    import taskRoutes from './routes/taskRoutes.js';
    import authRoutes from './routes/auth_routes.js';
    import cookieParser from 'cookie-parser';

    dotenv.config();

    const app = express();
    const port = 5000;

    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    app.use(express.json());
    app.use(cookieParser());

    mongoose.connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));

    app.use('/api/tasks', taskRoutes);
    app.use('/api/auth', authRoutes);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });