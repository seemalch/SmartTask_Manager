import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete, onEdit, onDelete }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;