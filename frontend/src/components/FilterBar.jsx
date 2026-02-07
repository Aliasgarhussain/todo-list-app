const FilterBar = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      status: '',
      priority: '',
      sortBy: 'createdAt',
      order: 'desc',
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={filters.priority}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sortBy">Sort By:</label>
        <select
          id="sortBy"
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
        >
          <option value="createdAt">Created Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="order">Order:</label>
        <select
          id="order"
          name="order"
          value={filters.order}
          onChange={handleChange}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      <button onClick={handleReset} className="btn btn-reset">
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
