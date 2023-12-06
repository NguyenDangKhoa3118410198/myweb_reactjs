const express = require('express');
const router = express.Router();

const todoController = require('../controllers/TodoController');

router.get('/', todoController.getTodolist);
router.post('/add', todoController.addTodo);
router.patch('/:id/edit', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
