const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Define routes for todos and comments
router.post('/todos', todoController.createTodo);
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodoById);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

// Add a comment to a specific todo
router.post('/todos/:id/comments', todoController.addComment);

module.exports = router;
