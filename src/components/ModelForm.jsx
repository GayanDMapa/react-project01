import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

export default function ModelForm({ isOpen, onClose, mode, onSubmit, taskData, error, setError}) 
{
  const [formData, setFormData] = useState({
    user_id: '',
    title: '',
    description: '',
    is_completed: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && taskData) {
      setFormData({
        user_id: taskData.user_id.toString(),
        title: taskData.title,
        description: taskData.description,
        is_completed: taskData.is_completed
      });
    } else {
      setFormData({
        user_id: '',
        title: '',
        description: '',
        is_completed: false
      });
    }
    setErrors({});
  }, [mode, taskData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.user_id.trim()) newErrors.user_id = "User ID is required!";
    if (!formData.title.trim()) newErrors.title = "Title is required!";
    if (isNaN(formData.user_id)) newErrors.user_id = "User ID must be a number";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit({
        ...formData,
        user_id: parseInt(formData.user_id)
      });
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.response?.data?.message || "An error occurred while saving the task");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {mode === 'edit' ? 'Edit Task' : 'Create New Task'}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <input
              type="text"
              className={`form-control ${errors.user_id ? 'is-invalid' : ''}`}
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              placeholder="Enter user ID"
            />
            {errors.user_id && <div className="invalid-feedback">{errors.user_id}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title (required)"
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <textarea
              className="form-control"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (optional)"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="status-switch"
                name="is_completed"
                checked={formData.is_completed}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="status-switch">
                Completed
              </label>
            </div>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {mode === 'edit' ? 'Save Changes' : 'Create Task'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}