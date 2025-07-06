import React from 'react';

const TaskItem = ({ task, onComplete, onEdit, onDelete }) => {
  return (
    <li className={`task-item ${task.completed ? 'completed-task' : ''}`}>
      <div>
        {task.completed && <span className="checkmark">✓</span>}
        <strong>{task.title}</strong>
        <span className="category">{task.category}</span>
        {task.description && <p>{task.description}</p>}
        {task.deadline && (
          <p>
            <strong>Deadline:</strong> {new Date(task.deadline).toLocaleString()}
          </p>
        )}
      </div>
      <div className="task-actions">
        <button onClick={() => onComplete(task)}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;