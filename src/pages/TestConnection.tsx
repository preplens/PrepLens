import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TestConnection = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Test Connection
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mt: 2 }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default TestConnection; 