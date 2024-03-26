const Todo = require('../models/Todo');

const getTodolist = async (req, res) => {
   console.log('--------------- Get todolist -------------------');
   try {
      const todoList = await Todo.find({});
      const newTodoList = todoList.map((todo) => ({
         id: todo._id,
         task: todo.task,
         completed: todo.completed,
         created: todo.createAt,
      }));
      res.json(newTodoList);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const addTodo = async (req, res) => {
   console.log('--------------- Add todo -------------------');
   const { task } = req.body;

   if (!task) {
      return res.status(400).json({ error: 'Task is required.' });
   }

   try {
      const newTodo = await Todo.create({ task: task });
      const todoToSend = {
         id: newTodo._id,
         task: newTodo.task,
         completed: newTodo.completed,
         createdAt: newTodo.createdAt,
         updatedAt: newTodo.updatedAt,
      };
      res.status(201).json(todoToSend);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const updateTodo = async (req, res) => {
   console.log('--------------- Update todo -------------------');
   const todoId = req.params.id;

   try {
      const existingTodo = await Todo.findById(todoId);

      if (!existingTodo) {
         return res.status(404).json({ error: 'Todo not found' });
      }

      existingTodo.completed = !existingTodo.completed;
      const updatedTodo = await existingTodo.save();
      res.status(201).json(updatedTodo);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const deleteTodo = async (req, res) => {
   console.log('--------------- Delete todo -------------------');
   const todoId = req.params.id;

   try {
      const existingTodo = await Todo.findById(todoId);

      if (!existingTodo) {
         return res.status(404).json({
            success: false,
            message: 'Todo not found',
         });
      }

      await existingTodo.deleteOne();
      res.json({
         success: true,
         message: 'User deleted successfully',
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = { getTodolist, addTodo, updateTodo, deleteTodo };
