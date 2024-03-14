import '../style/Homepage.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';


function HomePage() {
  return (
    <div>
        <Container>
      <h2>Welcome to the Timesheet Manager</h2>
      {/* Other content */}
      <p>wahahaha</p>
      <Link to="/timesheet">
      <Button variant="contained" sx={{ backgroundColor: '#007bff', color: '#fff', '&:hover': {
          backgroundColor: '#ff8a65',
        },
      }} >Go to Timesheet Manager</Button>
      </Link>
      </Container>
    </div>
  );
}

export default HomePage;
