import jwt from '../middleware/auth';
import { Router } from "express";
const builderRouter = Router();
const builderController = require('../controllers/builder.controller.js');

// Retrieve All data
builderRouter.get('/list', jwt, builderController.findAll);

// Retrieve data with pagination
builderRouter.get('/', jwt, builderController.findPagination);

// Find one by ID
builderRouter.get('/:id', jwt, builderController.findOne);

// Create
builderRouter.post('/', jwt, builderController.create);

// Update
builderRouter.put('/:id', jwt, builderController.update);

// Delete
builderRouter.delete('/:id', jwt, builderController.delete);

export default builderRouter;
