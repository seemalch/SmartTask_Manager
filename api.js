import axios from 'axios';

    const api = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true,
    });

    export const getTasks = () => api.get('/tasks');
    export const addTask = (taskData) => api.post('/tasks', taskData);
    export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);
    export const deleteTask = (id) => api.delete(`/tasks/${id}`);

    export default api;