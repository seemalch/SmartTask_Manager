import React from 'react';

const Filter = ({ filterCategory, onChangeFilter, filterDeadline, onChangeDeadlineFilter }) => {
  return (
    <div className="filter">
      <div>
        <label>Filter by Category</label>
        <select value={filterCategory} onChange={onChangeFilter}>
          <option value="All">All Categories</option>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Learning">Learning</option>
        </select>
      </div>
      <div>
        <label>Filter by Deadline</label>
        <select value={filterDeadline} onChange={onChangeDeadlineFilter}>
          <option value="All">All Deadlines</option>
          <option value="Overdue">Overdue</option>
          <option value="Upcoming">Upcoming (within 24h)</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;