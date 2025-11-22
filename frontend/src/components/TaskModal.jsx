import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { createTask, updateTask } from '../store/slice/taskSlice';

const TaskModal = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);

  // State for task fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  // Reset form fields when modal opens
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      const formatedDate = task.dueDate.split('T')[0] || '';
      setDueDate(formatedDate);
      setStatus(task.status);
    } else {
      setTitle('');
      setDescription('');
      setPriority('low');
      setDueDate('');
      setStatus('pending');
    }
  }, [task, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDueDate = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!task && selectedDueDate < today) {
      alert('Cannot create a task with a past due date.');
      return;
    }

    const taskData = { title, description, priority, dueDate, status };
    console.log("Sending task:", taskData);

    if (task) {
      await dispatch(updateTask({ id: task._id, task: taskData }));
    } else {
      await dispatch(createTask(taskData));
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div
        className={`p-6 rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}
        style={{ maxWidth: '500px', width: '100%' }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {task ? 'Edit Task' : 'Create Task'}
          </h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`w-full p-2 mt-1 border rounded ${
                isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'
              }`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-sm font-medium">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={`w-full p-2 mt-1 border rounded ${
                isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'
              }`}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
