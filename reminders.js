export const checkReminders = (tasks) => {
  const now = new Date();
  return tasks.filter(task => task.reminder && new Date(task.reminder) <= now && !task.completed);
};