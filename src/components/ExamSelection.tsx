import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Container,
} from '@mui/material';
import {
  School as SchoolIcon,
  Engineering as EngineeringIcon,
  Train as TrainIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedExam } from '../store/slices/examSlice';
import type { ExamType } from '../store/slices/examSlice';

const exams = [
  {
    id: 'ssc-cgl' as ExamType,
    name: 'SSC CGL',
    description: 'Staff Selection Commission Combined Graduate Level',
    icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    id: 'ssc-chsl' as ExamType,
    name: 'SSC CHSL',
    description: 'Staff Selection Commission Combined Higher Secondary Level',
    icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    id: 'rrb-ntpc' as ExamType,
    name: 'RRB NTPC',
    description: 'Railway Recruitment Board Non-Technical Popular Categories',
    icon: <TrainIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    id: 'rrb-je' as ExamType,
    name: 'RRB JE',
    description: 'Railway Recruitment Board Junior Engineer',
    icon: <EngineeringIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
];

const ExamSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);

  const handleExamSelect = (examId: ExamType) => {
    setSelectedExam(examId);
  };

  const handleContinue = () => {
    if (selectedExam) {
      dispatch(setSelectedExam(selectedExam));
      navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{ mb: 1, fontWeight: 700 }}
        >
          Select Your Exam
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Choose the exam you're preparing for to get personalized content
        </Typography>

        <Grid container spacing={3}>
          {exams.map((exam) => (
            <Grid item xs={12} sm={6} md={3} key={exam.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  transform: selectedExam === exam.id ? 'translateY(-8px)' : 'none',
                  boxShadow: selectedExam === exam.id ? 4 : 1,
                  border: selectedExam === exam.id ? 2 : 0,
                  borderColor: 'primary.main',
                }}
              >
                <CardActionArea
                  onClick={() => handleExamSelect(exam.id)}
                  sx={{ height: '100%' }}
                >
                  <CardContent
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{exam.icon}</Box>
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{ mb: 1, fontWeight: 600 }}
                    >
                      {exam.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {exam.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 6,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            disabled={!selectedExam}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 2,
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ExamSelection; 