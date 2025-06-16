import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Publish as PublishIcon,
} from '@mui/icons-material';
import { questions } from '../../data/questions';
import QuestionService, { Question } from '../../services/questionService';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [questionService] = useState(() => QuestionService.getInstance());

  const exams = Object.keys(questions);
  const subjects = selectedExam ? Object.keys(questions[selectedExam]) : [];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleAddQuestion = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedExam('');
    setSelectedSubject('');
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(0);
    setExplanation('');
    setDifficulty('medium');
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSaveQuestion = () => {
    if (!selectedExam || !selectedSubject || !questionText || options.some(opt => !opt)) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    try {
      const newQuestion = questionService.addQuestion({
        examId: selectedExam,
        subjectId: selectedSubject,
        question: {
          text: questionText,
          options,
          correctAnswer,
          explanation,
          difficulty,
        }
      });

      setSnackbar({
        open: true,
        message: 'Question added successfully',
        severity: 'success'
      });
      handleCloseDialog();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add question',
        severity: 'error'
      });
    }
  };

  const handlePublishQuestion = (examId: string, subjectId: string, questionId: number) => {
    try {
      const published = questionService.publishQuestion(examId, subjectId, questionId);
      if (published) {
        setSnackbar({
          open: true,
          message: 'Question published successfully',
          severity: 'success'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to publish question',
        severity: 'error'
      });
    }
  };

  const handleDeleteQuestion = (examId: string, subjectId: string, questionId: number) => {
    try {
      const deleted = questionService.deleteQuestion(examId, subjectId, questionId);
      if (deleted) {
        setSnackbar({
          open: true,
          message: 'Question deleted successfully',
          severity: 'success'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to delete question',
        severity: 'error'
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage questions and content
        </Typography>
      </Box>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Questions" />
          <Tab label="Analytics" />
          <Tab label="Settings" />
        </Tabs>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddQuestion}
        >
          Add New Question
        </Button>
      </Box>

      <Grid container spacing={3}>
        {exams.map((exam) => (
          <Grid item xs={12} md={6} lg={4} key={exam}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {exam.toUpperCase()}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {Object.keys(questions[exam]).map((subject) => (
                    <Chip
                      key={subject}
                      label={`${subject} (${questions[exam][subject].length})`}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small">View Questions</Button>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Exam</InputLabel>
              <Select
                value={selectedExam}
                label="Exam"
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                {exams.map((exam) => (
                  <MenuItem key={exam} value={exam}>
                    {exam.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={selectedSubject}
                label="Subject"
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!selectedExam}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Question Text"
              multiline
              rows={4}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              fullWidth
              required
            />

            {options.map((option, index) => (
              <TextField
                key={index}
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                fullWidth
                required
              />
            ))}

            <FormControl fullWidth>
              <InputLabel>Correct Answer</InputLabel>
              <Select
                value={correctAnswer}
                label="Correct Answer"
                onChange={(e) => setCorrectAnswer(Number(e.target.value))}
              >
                {options.map((_, index) => (
                  <MenuItem key={index} value={index}>
                    Option {index + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Explanation"
              multiline
              rows={3}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={difficulty}
                label="Difficulty"
                onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveQuestion} variant="contained">
            Save Question
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminDashboard; 