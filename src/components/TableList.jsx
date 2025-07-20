import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { getLoggedInUserId } from '../utils/auth.jsx';
import { verifyEmail } from '../api';

function TableList({ tasks, handleOpen, handleDelete, searchTerm }) {
  const [localError, setLocalError] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'list'

  const userId = getLoggedInUserId();
  console.log('Logged-in user ID:', userId);

  // Extract token from URL
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');

  // Optionally, verify email if token exists
  useEffect(() => {
    if (token) {
      verifyEmail(token)
        .then(data => {
          console.log('Email verified:', data);
          // Optionally show a success message to the user
        })
        .catch(error => {
          console.error('Email verification failed:', error);
          // Optionally show an error message to the user
        });
    }
  }, [token]);

  const filteredData = tasks.filter((task) => {
    if (!task) return false;
    if (!searchTerm) return true;
    const lower = searchTerm.toLowerCase();
    return (
      String(task.user_id).toLowerCase().includes(lower) ||
      String(task.title).toLowerCase().includes(lower) ||
      String(task.description).toLowerCase().includes(lower)
    );
  });

  const confirmAndDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      try {
        await handleDelete(id);
      } catch (err) {
        setLocalError(err.message);
      }
    }
  };

  const toggleComplete = async (task) => {
    try {
      await handleOpen('edit', { 
        ...task, 
        is_completed: !task.is_completed 
      });
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="mt-4">
      {localError && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          {localError}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setLocalError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="d-flex justify-content-between mb-3">
        <h2>My Tasks 📝</h2>
        <div>
          <Button 
            variant={viewMode === 'table' ? 'primary' : 'outline-primary'} 
            size="sm" 
            onClick={() => setViewMode('table')}
            className="me-2"
          >
            Table View
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'primary' : 'outline-primary'} 
            size="sm" 
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  {searchTerm ? 'No tasks match your search' : 'No tasks available. Add one to get started!'}
                </td>
              </tr>
            ) : (
              filteredData.map((task) => (    // <-- Correctly use map() here
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>{task.title}</td>
                  <td>{task.description || '-'}</td>
                  <td>
                    <Badge pill bg={task.is_completed ? "success" : "warning"} text="dark">
                      {task.is_completed ? "Completed" : "Pending"}
                    </Badge>
                  </td>
                  <td className="d-flex gap-2">
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleOpen('edit', task)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => confirmAndDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      ) : (
        <ListGroup>
          {filteredData.length === 0 ? (
            <ListGroup.Item className="text-center py-4">
              {searchTerm ? 'No tasks match your search' : 'No tasks available. Add one to get started!'}
            </ListGroup.Item>
          ) : (
            filteredData.map((task) => (
              <ListGroup.Item 
                key={task.id} 
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <span className={task.is_completed ? "text-decoration-line-through" : ""}>
                    <strong>{task.title}</strong>
                  </span>
                  {task.description && (
                    <div className="text-muted small mt-1">{task.description}</div>
                  )}
                </div>
                <div>
                  <Button 
                    variant={task.is_completed ? "success" : "outline-success"} 
                    size="sm"
                    className="me-2"
                    onClick={() => toggleComplete(task)}
                  >
                    {task.is_completed ? '✓' : 'Mark Done'}
                  </Button>
                  <Button 
                    variant="outline-warning" 
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpen('edit', task)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => confirmAndDelete(task.id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      )}
    </div>
  );
}

export default TableList;
