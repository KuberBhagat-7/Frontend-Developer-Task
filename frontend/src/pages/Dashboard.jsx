// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusCircle, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { fetchTasks } from '../store/slice/taskSlice';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const dispatch = useDispatch();

  const { tasks = [], loading } = useSelector((state) => state.tasks);
  const { isDark } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const today = new Date().toDateString();

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus;
  });

  const dueTodayCount = tasks.filter(
    (task) =>
      task.status !== 'completed' &&
      new Date(task.dueDate).toDateString() === today
  ).length;

  const highPriorityCount = tasks.filter(
    (task) => task.status !== 'completed' && task.priority === 'high'
  ).length;

  const pendingCount = tasks.filter((task) => task.status === 'pending').length;
  const completedCount = tasks.filter((task) => task.status === 'completed').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          My Tasks
        </h1>
        <button
          onClick={openCreateModal}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle size={20} className="mr-2" />
          Add Task
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          icon={<Calendar size={20} className="text-yellow-500" />}
          title="Due Today"
          count={dueTodayCount}
          isDark={isDark}
        />
        <SummaryCard
          icon={<AlertCircle size={20} className="text-red-500" />}
          title="High Priority"
          count={highPriorityCount}
          isDark={isDark}
        />
        <SummaryCard
          icon={<Clock size={20} className="text-blue-500" />}
          title="Pending"
          count={pendingCount}
          isDark={isDark}
        />
        <SummaryCard
          icon={<CheckCircle size={20} className="text-green-500" />}
          title="Completed"
          count={completedCount}
          isDark={isDark}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6">
        {['all', 'pending', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded ${
              filterStatus === status
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task._id} task={task} onEdit={() => openEditModal(task)} />
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};

const SummaryCard = ({ icon, title, count, isDark }) => (
  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
    <div className="flex items-center mb-2 space-x-2">
      {icon}
      <h2
        className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
      >
        {title} ({count})
      </h2>
    </div>
  </div>
);

export default Dashboard;