import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import taskService from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'createdAt',
    order: 'desc',
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await taskService.getAllTasks(filters);
      setTasks(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await taskService.createTask(taskData);
      setTasks([response.data, ...tasks]);
      setError(null);
      alert('Task created successfully!');
    } catch (err) {
      setError(err.message || 'Failed to create task');
      alert('Error: ' + (err.message || 'Failed to create task'));
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await taskService.updateTask(editTask._id, taskData);
      setTasks(tasks.map((task) => 
        task._id === editTask._id ? response.data : task
      ));
      setEditTask(null);
      setError(null);
      alert('Task updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update task');
      alert('Error: ' + (err.message || 'Failed to update task'));
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
      setError(null);
      alert('Task deleted successfully!');
    } catch (err) {
      setError(err.message || 'Failed to delete task');
      alert('Error: ' + (err.message || 'Failed to delete task'));
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await taskService.updateTaskStatus(id, status);
      setTasks(tasks.map((task) => 
        task._id === id ? response.data : task
      ));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to update status');
      alert('Error: ' + (err.message || 'Failed to update status'));
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      fetchTasks();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await taskService.searchTasks(query);
      setTasks(response.data);
    } catch (err) {
      setError(err.message || 'Failed to search tasks');
      console.error('Error searching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  const handleFormSubmit = (taskData) => {
    if (editTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>To-Do List App</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="form-section">
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="btn btn-toggle"
          >
            {showForm ? 'Hide Form' : 'Show Form'}
          </button>
          
          {showForm && (
            <TaskForm
              onSubmit={handleFormSubmit}
              editTask={editTask}
              onCancel={handleCancelEdit}
            />
          )}
        </div>

        <div className="controls-section">
          <SearchBar onSearch={handleSearch} />
          <FilterBar filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="tasks-section">
          <div className="tasks-header">
            <h2>Tasks ({tasks.length})</h2>
            <button onClick={fetchTasks} className="btn btn-refresh">
              Refresh
            </button>
          </div>

          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
