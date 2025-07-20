import React from 'react';

const MyTableList = ({ tasks, handleOpen, handleDelete, searchTerm }) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const filtered = safeTasks.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th style={{ width: '150px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">No tasks found.</td>
            </tr>
          ) : (
            filtered.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleOpen('edit', task)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyTableList;