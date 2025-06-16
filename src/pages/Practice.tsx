import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { RootState } from '../store';
import {
  setQuestions,
  setCurrentQuestion,
  answerQuestion,
  setSubject,
  setTopic,
  setDifficulty,
} from '../store/slices/practiceSlice';
import { addPerformanceData } from '../store/slices/analyticsSlice';

const Practice = () => {
  const dispatch = useDispatch();
  const {
    currentQuestion,
    questions,
    userAnswers,
    score,
    currentSubject,
    currentTopic,
    difficulty,
  } = useSelector((state: RootState) => state.practice);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, [currentSubject, currentTopic, difficulty]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      // TODO: Replace with actual API call
      const response = await fetch(
        `/api/questions?subject=${currentSubject}&topic=${currentTopic}&difficulty=${difficulty}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch questions');
      }

      dispatch(setQuestions(data));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    dispatch(
      answerQuestion({
        questionId: currentQuestion.id,
        answer: selectedAnswer,
      })
    );

    setShowExplanation(true);
  };

  const handleNext = () => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestion?.id);
    if (currentIndex < questions.length - 1) {
      dispatch(setCurrentQuestion(questions[currentIndex + 1]));
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // End of practice session
      dispatch(
        addPerformanceData({
          date: new Date().toISOString(),
          score,
          totalQuestions: questions.length,
          subject: currentSubject,
          topic: currentTopic,
          timeSpent: 0, // TODO: Implement time tracking
        })
      );
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!currentQuestion) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            No questions available
          </Typography>
          <Typography variant="body1">
            Please select a subject and topic to start practicing.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Question {questions.findIndex((q) => q.id === currentQuestion.id) + 1} of{' '}
                {questions.length}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={currentQuestion.subject} color="primary" />
                <Chip label={currentQuestion.topic} color="secondary" />
                <Chip label={currentQuestion.difficulty} />
              </Box>
            </Box>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {currentQuestion.text}
                </Typography>

                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormLabel component="legend">Select your answer:</FormLabel>
                  <RadioGroup
                    value={selectedAnswer}
                    onChange={(e) => handleAnswerSelect(Number(e.target.value))}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={index}
                        control={<Radio />}
                        label={option}
                        disabled={showExplanation}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>

                {showExplanation && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Explanation:
                    </Typography>
                    {currentQuestion.explanation}
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={selectedAnswer === null || showExplanation}
              >
                Submit Answer
              </Button>
              {showExplanation && (
                <Button variant="contained" onClick={handleNext}>
                  {questions.findIndex((q) => q.id === currentQuestion.id) ===
                  questions.length - 1
                    ? 'Finish Practice'
                    : 'Next Question'}
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Practice; 