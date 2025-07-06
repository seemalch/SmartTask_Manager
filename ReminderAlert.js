import React from 'react';

const ReminderAlert = ({ reminders }) => {
  return (
    <>
      {reminders.map(task => (
        <div key={task._id} className="alert">
          Reminder: Task "{task.title}" is due soon!
        </div>
      ))}
    </>
  );
};

export default ReminderAlert;