import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete, onStatusChange, loading }) => {
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (!tasks || tasks.length === 0) {
    return <div className="no-tasks">No tasks found. Create your first task!</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;
