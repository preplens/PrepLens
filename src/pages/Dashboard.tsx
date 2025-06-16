import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Chip,
  CardActionArea,
} from '@mui/material';
import {
  School as SchoolIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useState } from 'react';

interface Exam {
  id: string;
  name: string;
  subjects: Subject[];
}

interface Subject {
  id: string;
  name: string;
  questionCount: number;
}

const exams: Exam[] = [
  {
    id: 'upsc',
    name: 'UPSC Civil Services',
    subjects: [
      { id: 'gs1', name: 'General Studies Paper 1', questionCount: 50 },
      { id: 'gs2', name: 'General Studies Paper 2', questionCount: 50 },
      { id: 'gs3', name: 'General Studies Paper 3', questionCount: 50 },
      { id: 'gs4', name: 'General Studies Paper 4', questionCount: 50 },
    ],
  },
  {
    id: 'ssc',
    name: 'SSC CGL',
    subjects: [
      { id: 'quant', name: 'Quantitative Aptitude', questionCount: 50 },
      { id: 'reasoning', name: 'Logical Reasoning', questionCount: 50 },
      { id: 'english', name: 'English Language', questionCount: 50 },
      { id: 'gk', name: 'General Awareness', questionCount: 50 },
    ],
  },
  {
    id: 'banking',
    name: 'Banking Exams',
    subjects: [
      { id: 'reasoning', name: 'Reasoning Ability', questionCount: 50 },
      { id: 'quant', name: 'Quantitative Aptitude', questionCount: 50 },
      { id: 'english', name: 'English Language', questionCount: 50 },
      { id: 'gk', name: 'General Awareness', questionCount: 50 },
    ],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const handleExamSelect = (exam: Exam) => {
    setSelectedExam(exam);
  };

  const handleSubjectSelect = (subject: Subject) => {
    navigate(`/practice/${selectedExam?.id}/${subject.id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to PrepLens
      </Typography>

      <Grid container spacing={3}>
        {/* Exam Selection Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Select Your Exam
          </Typography>
          <Grid container spacing={3}>
            {exams.map((exam) => (
              <Grid item xs={12} sm={6} md={4} key={exam.id}>
                <Card
                  sx={{
                    height: '100%',
                    border: selectedExam?.id === exam.id ? '2px solid #1976d2' : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleExamSelect(exam)}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {exam.name}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {exam.subjects.map((subject) => (
                          <Chip
                            key={subject.id}
                            label={subject.name}
                            size="small"
                            sx={{ m: 0.5 }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Selected Exam Subjects */}
        {selectedExam && (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Select a Subject for {selectedExam.name}
            </Typography>
            <Grid container spacing={2}>
              {selectedExam.subjects.map((subject) => (
                <Grid item xs={12} sm={6} md={3} key={subject.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {subject.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {subject.questionCount} Questions
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleSubjectSelect(subject)}
                        sx={{ mt: 2 }}
                      >
                        Start Practice
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}

        {/* Progress Section */}
        <Grid item xs={12}>
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5">Your Progress</Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" paragraph>
                Track your performance and see how you're improving over time.
                Get detailed analytics and insights.
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/analytics')}
                sx={{ mt: 2 }}
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 