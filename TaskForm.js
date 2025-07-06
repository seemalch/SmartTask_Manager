import React from 'react';

const TaskForm = ({ 
  title, 
  description, 
  deadline, 
  category, 
  editId, 
  onChangeTitle, 
  onChangeDescription, 
  onChangeDeadline, 
  onChangeCategory, 
  onSubmit 
}) => {
  
  // Define your categories
  const categories = ["General", "Personal", "Work", "Learning"];

  return (
    <form onSubmit={onSubmit} className="task-form">
      <input 
        type="text" 
        placeholder="Task Title" 
        value={title} 
        onChange={onChangeTitle} 
      />
      
      <input 
        type="text" 
        placeholder="Description" 
        value={description} 
        onChange={onChangeDescription} 
      />
      
      <input 
        type="datetime-local" 
        value={deadline} 
        onChange={onChangeDeadline} 
      />
      
      {/* Add this category selection section */}
      <div className="category-section">
        <label>Category:</label>
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`pill ${category === cat ? "active" : ""}`}
              onClick={() => onChangeCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <button type="submit">
        {editId ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;