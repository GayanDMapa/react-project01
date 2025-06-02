import { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default function TaskFormModal({
  isOpen,
  onClose,
  mode = 'add',       // Default to 'add'
  onSubmit,          
  taskData = null,    // Default to null
  error = null,       // Default to null
  setError,          
  loggedInUserId,
  isLoading = false  // Add loading state
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_completed: false,
  });

  const [errors, setErrors] = useState({});

  // Initialize form data when modal opens or mode/taskData changes
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && taskData) {
        setFormData({
          title: taskData.title || '',
          description: taskData.description || '',
          is_completed: taskData.is_completed || false,
        });
      } else {
        // Reset form for add mode
        setFormData({
          title: '',
          description: '',
          is_completed: false,
        });
      }
      setErrors({});
      setError(null);
    }
  }, [mode, taskData, isOpen, setError]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (formData.title.length > 100) newErrors.title = "Title must be less than 100 characters";
    if (formData.description.length > 500) newErrors.description = "Description must be less than 500 characters";
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
        user_id: loggedInUserId,
        // Include task ID if in edit mode
        ...(mode === 'edit' && taskData?.id && { id: taskData.id })
      });
      // Only close if onSubmit doesn't throw an error
      onClose();
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.response?.data?.message || "An error occurred while saving the task");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'edit' ? 'Edit Task' : 'Create New Task'}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3" controlId="taskTitle">
            <Form.Label>Title <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              isInvalid={!!errors.title}
              maxLength={100}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              {formData.title.length}/100 characters
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description (optional)"
              isInvalid={!!errors.description}
              maxLength={500}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              {formData.description.length}/500 characters
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="taskStatus">
            <Form.Check
              type="switch"
              name="is_completed"
              label="Completed"
              checked={formData.is_completed}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Saving...</span>
              </>
            ) : mode === 'edit' ? 'Save Changes' : 'Create Task'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}