import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Alert,
  IconButton,
  Chip,
  FormControl,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ProgressService from '../services/progressService';
import { questions } from '../data/questions';
import { Badge } from '../data/achievements';

const PracticeTest = () => {
  const { examId, subjectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [showBadgeDialog, setShowBadgeDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const progressService = ProgressService.getInstance();

  const examQuestions = questions[examId!]?.[subjectId!] || [];
  const progress = (currentQuestion / examQuestions.length) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === examQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Update progress and check for new badges
    if (user) {
      const { newBadges: earnedBadges } = progressService.updateProgress(
        user.id,
        subjectId!,
        isCorrect
      );
      if (earnedBadges.length > 0) {
        setNewBadges(earnedBadges);
        setShowBadgeDialog(true);
      }
    }

    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Test completed
      navigate('/dashboard');
    }
  };

  const handleBadgeDialogClose = () => {
    setShowBadgeDialog(false);
    setNewBadges([]);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!examQuestions.length) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">No questions found for this subject.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          Practice Test - {examId?.toUpperCase()} - {subjectId?.toUpperCase()}
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Time Remaining: {formatTime(timeLeft)}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            Question {currentQuestion + 1} of {examQuestions.length}
          </Typography>
          <Chip
            label={`Score: ${score}/${currentQuestion + 1}`}
            color="primary"
            variant="outlined"
          />
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {examQuestions[currentQuestion].text}
          </Typography>

          <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
            <RadioGroup
              value={selectedAnswer}
              onChange={(e) => handleAnswerSelect(Number(e.target.value))}
            >
              {examQuestions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={index}
                  control={<Radio />}
                  label={option}
                  sx={{
                    mb: 1,
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {showExplanation && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle1" color="primary" gutterBottom>
                Explanation:
              </Typography>
              <Typography variant="body1">
                {examQuestions[currentQuestion].explanation}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => setShowExplanation(!showExplanation)}
            >
              {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              {currentQuestion < examQuestions.length - 1 ? 'Next Question' : 'Finish'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Badge Achievement Dialog */}
      <Dialog open={showBadgeDialog} onClose={handleBadgeDialogClose}>
        <DialogTitle>New Badge Earned! 🎉</DialogTitle>
        <DialogContent>
          {newBadges.map((badge) => (
            <Box key={badge.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" sx={{ mr: 2 }}>
                {badge.icon}
              </Typography>
              <Box>
                <Typography variant="h6">{badge.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {badge.description}
                </Typography>
                <Typography variant="body2" color="primary">
                  +{badge.points} points
                </Typography>
              </Box>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBadgeDialogClose}>Continue</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PracticeTest; 