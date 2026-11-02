import jwt from '../middleware/auth';
import { Router } from "express";
const machineRouter = Router();
const machineController = require('../controllers/machine.controller.js');

// Retrieve All data
machineRouter.get('/list', jwt, machineController.findAll);

// Retrieve data with pagination
machineRouter.get('/', jwt, machineController.findPagination);

// Find one by ID
machineRouter.get('/:id', jwt, machineController.findOne);

// Create
machineRouter.post('/', jwt, machineController.create);

// Update
machineRouter.put('/:id', jwt, machineController.update);

// Delete
machineRouter.delete('/:id', jwt, machineController.delete);

export default machineRouter;
