import express from 'express';
    import { verifyToken } from '../middleware/verifyToken.js';
    import Task from '../models/taskModel.js';

    const router = express.Router();

    router.get('/', verifyToken, async (req, res) => {
      try {
        const tasks = await Task.find({ userId: req.userId });
        res.json(tasks);
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    });

    router.post('/', verifyToken, async (req, res) => {
      const { title, description, deadline, category, userId } = req.body;
      if (!title || !userId) return res.status(400).json({ message: 'Title and userId are required' });
      const task = new Task({ title, description, deadline, category, userId });
      try {
        const newTask = await task.save();
        res.status(201).json(newTask);
      } catch (err) {
        res.status(400).json({ message: 'Invalid task data' });
      }
    });

    router.put('/:id', verifyToken, async (req, res) => {
      try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        const { title, description, deadline, category, completed } = req.body;
        if (title) task.title = title;
        if (description) task.description = description;
        if (deadline) task.deadline = deadline;
        if (category) task.category = category;
        if (completed !== undefined) task.completed = completed;
        const updatedTask = await task.save();
        res.json(updatedTask);
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    });

    router.delete('/:id', verifyToken, async (req, res) => {
      try {
        const result = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!result) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    });

    export default router;