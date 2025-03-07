import express from 'express';
import { getUsers } from '../controller/userController.js';

const userRoutes = express.Router();

userRoutes.get('/users', getUsers);

export default userRoutes;
