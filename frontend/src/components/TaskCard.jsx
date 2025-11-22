// components/TaskCard.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Trash2, CheckCircle, Clock } from 'lucide-react';
import { updateTask, deleteTask } from '../store/slice/taskSlice';

const TaskCard = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((state) => state.theme);

  const handleToggleStatus = () => {
    dispatch(
      updateTask({
        id: task._id,
        task: { status: task.status === 'completed' ? 'pending' : 'completed' },
      })
    );
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <div
      className={`${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
        task.status === 'completed' ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={handleToggleStatus}
            className={`mt-1 ${
              task.status === 'completed'
                ? 'text-green-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <CheckCircle size={20} className="cursor-pointer" />
          </button>

          <div>
            <h3
              className={`font-semibold ${
                task.status === 'completed'
                  ? 'line-through text-gray-500'
                  : ''
              }`}
            >
              {task.title}
            </h3>

            <p
              className={`text-sm mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              {task.description}
            </p>

            <div className="flex items-center mt-2 space-x-4">
              <span
                className={`text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority.charAt(0).toUpperCase() +
                  task.priority.slice(1)}
              </span>

              <div
                className={`flex items-center text-xs ${
                  isOverdue
                    ? 'text-red-500'
                    : isDark
                    ? 'text-gray-400'
                    : 'text-gray-600'
                }`}
              >
                <Clock size={14} className="mr-1" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={handleDelete}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
