import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Task from '../models/taskModel.js';

const router = express.Router();

// Create a new task

router.post('/', protect, async (req, res) => {

    const {title, description, priority,status, dueDate} = req.body;

    const task = await Task.create({
        user: req.user._id,
        title,
        description,
        priority,
        status,
        dueDate
    })

    res.status(201).json(task)

})


// Get all tasks for the authenticated user

router.get('/', protect, async (req, res) => {
    const task = await Task.find({user:req.user._id})
    res.json(task)
})

router.put('/:id', protect, async (req, res) => {



    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    if(task.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this task' });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    const updatedTask = await task.save();
    res.json(updatedTask);
})


// Delete a task

router.delete('/:id', protect, async (req, res) => {

    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    if(task.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this task' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
    

})

export default router;