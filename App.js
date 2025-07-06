import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import ReminderAlert from './components/ReminderAlert';
import Login from './components/Login';
import Signup from './components/Signup';
import VerifyEmail from './components/VerifyEmail';
import { useAuthStore } from './store/useAuthStore';
import { getTasks, addTask, updateTask, deleteTask } from './services/api';
import { checkReminders } from './utils/reminders';
import './styles/App.css';

const App = () => {
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('General');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDeadline, setFilterDeadline] = useState('All');
  const [editId, setEditId] = useState(null);

  // Define categories for consistent usage throughout the app
  const categories = ["General", "Personal", "Work", "Learning"];

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const fetchData = async () => {
        try {
          const tasksRes = await getTasks();
          setTasks(tasksRes.data);
        } catch (err) {
          console.error('Fetch error:', err.message);
        }
      };
      fetchData();
    }
  }, [isAuthenticated, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    
    const taskData = { 
      title, 
      description, 
      deadline, 
      category, 
      userId: user?._id 
    };

    try {
      if (editId) {
        const res = await updateTask(editId, taskData);
        setTasks(tasks.map(task => task._id === editId ? res.data : task));
      } else {
        const res = await addTask(taskData);
        setTasks([...tasks, res.data]);
      }
      
      // Reset form
      setTitle('');
      setDescription('');
      setDeadline('');
      setCategory('General');
      setEditId(null);
    } catch (err) {
      console.error('Task operation error:', err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Delete error:', err.response?.data || err.message);
    }
  };

  const handleEdit = (task) => {
    if (!isAuthenticated) return;
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description || '');
    setDeadline(task.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : '');
    setCategory(task.category);
  };

  const handleComplete = async (task) => {
    if (!isAuthenticated) return;
    try {
      const res = await updateTask(task._id, { 
        ...task, 
        completed: !task.completed 
      });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (err) {
      console.error('Complete error:', err.response?.data || err.message);
    }
  };

  const filteredTasks = tasks.filter(task => 
    filterCategory === 'All' || task.category === filterCategory
  ).filter(task => {
    if (filterDeadline === 'All') return true;
    if (!task.deadline) return false;
    
    const now = new Date();
    const taskDate = new Date(task.deadline);
    
    if (filterDeadline === 'Overdue') {
      return taskDate < now && !task.completed;
    }
    if (filterDeadline === 'Upcoming') {
      const twentyFourHours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      return taskDate <= twentyFourHours && taskDate >= now;
    }
    return true;
  });

  const reminders = checkReminders(tasks);

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="content-container text-center">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <div className="content-container">
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/tasks" />} />
            <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/tasks" />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/tasks" element={isAuthenticated ? (
              <>
              <header className="app-header">
  <h1 className="app-title">Smart Task Manager</h1>
  <button className="logout-btn" onClick={logout}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  </button>
</header>
                
                {reminders.length > 0 && <ReminderAlert reminders={reminders} />}
                
                <TaskForm 
                  title={title}
                  description={description}
                  deadline={deadline}
                  category={category}
                  categories={categories}
                  editId={editId}
                  onChangeTitle={(e) => setTitle(e.target.value)}
                  onChangeDescription={(e) => setDescription(e.target.value)}
                  onChangeDeadline={(e) => setDeadline(e.target.value)}
                  onChangeCategory={setCategory}  // Directly pass the setter
                  onSubmit={handleSubmit}
                />
                
                <Filter 
                  filterCategory={filterCategory}
                  onChangeFilter={(e) => setFilterCategory(e.target.value)}
                  filterDeadline={filterDeadline}
                  onChangeDeadlineFilter={(e) => setFilterDeadline(e.target.value)}
                  categories={categories}
                />
                
                <TaskList 
                  tasks={filteredTasks} 
                  onComplete={handleComplete} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              </>
              
            ) : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/tasks" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;