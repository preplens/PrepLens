import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Email as EmailIcon,
  School as SchoolIcon,
  Timeline as TimelineIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { RootState } from '../store';
import { updateUser } from '../store/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      dispatch(updateUser(data));
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const stats = [
    {
      title: 'Total Practice Sessions',
      value: '24',
      icon: <SchoolIcon />,
    },
    {
      title: 'Average Score',
      value: '85%',
      icon: <TimelineIcon />,
    },
    {
      title: 'Questions Attempted',
      value: '1,234',
      icon: <SchoolIcon />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </Avatar>
              {!isEditing ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    {user?.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {user?.email}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                    sx={{ mt: 2 }}
                  >
                    Edit Profile
                  </Button>
                </>
              ) : (
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      {success}
                    </Alert>
                  )}
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Statistics */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {stats.map((stat) => (
              <Grid item xs={12} sm={4} key={stat.title}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {stat.icon}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {stat.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4">{stat.value}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Completed Practice Session"
                  secondary="Mathematics - Algebra"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <TimelineIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Achieved New High Score"
                  secondary="Physics - Mechanics"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Profile Updated"
                  secondary="2 days ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 