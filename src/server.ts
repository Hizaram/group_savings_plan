// src/server.ts
import express from 'express';
import { DataSourceOptions, createConnection } from 'typeorm';
import { User } from "./entities/User";
import * as config from "../ormconfig.json";


import authRoutes from './routes/authRoutes';
//import userRoutes from './routes/userRoutes';
//import savingsPlanRoutes from './routes/savingsPlanRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
//app.use('/api/user', userRoutes);
//app.use('/api/savings-plan', savingsPlanRoutes);

// Start server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Connect to the database
  try {
    await createConnection({
      ...(config as DataSourceOptions),
      entities: [User],
    })
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});