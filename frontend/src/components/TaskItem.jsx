const TaskItem = ({ task, onEdit, onDelete, onStatusChange }) => {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleStatusChange = (e) => {
    onStatusChange(task._id, e.target.value);
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  return (
    <div className={`task-item ${getStatusClass(task.status)}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        {task.dueDate && (
          <span className="task-date">
            Due: {formatDate(task.dueDate)}
          </span>
        )}
        {task.tags && task.tags.length > 0 && (
          <div className="task-tags">
            {task.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="task-actions">
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={() => onEdit(task)} className="btn btn-edit">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)} className="btn btn-delete">
          Delete
        </button>
      </div>

      <div className="task-timestamps">
        <small>Created: {formatDate(task.createdAt)}</small>
      </div>
    </div>
  );
};

export default TaskItem;
