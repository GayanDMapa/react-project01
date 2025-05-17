import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function OutlineTypesExample() {
  const navigate = useNavigate();

  return (
    <>
      <Button 
        variant="outline-warning" 
        onClick={() => navigate('/tasks')}
      >
        Warning
      </Button>
    </>
  );
}

export default OutlineTypesExample;
