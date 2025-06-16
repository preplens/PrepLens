import { useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const {
    performanceHistory,
    averageScore,
    totalQuestionsAttempted,
    timeSpentTotal,
    subjectWisePerformance,
    topicWisePerformance,
  } = useSelector((state: RootState) => state.analytics);

  const performanceData = {
    labels: performanceHistory.map((data) => new Date(data.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Score',
        data: performanceHistory.map((data) => (data.score / data.totalQuestions) * 100),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const subjectData = {
    labels: Object.keys(subjectWisePerformance),
    datasets: [
      {
        label: 'Performance by Subject',
        data: Object.values(subjectWisePerformance).map(
          (data) => (data.correct / data.total) * 100
        ),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
      },
    ],
  };

  const topicData = {
    labels: Object.keys(topicWisePerformance),
    datasets: [
      {
        label: 'Questions by Topic',
        data: Object.values(topicWisePerformance).map((data) => data.total),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Score
              </Typography>
              <Typography variant="h3">{averageScore.toFixed(1)}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Questions
              </Typography>
              <Typography variant="h3">{totalQuestionsAttempted}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Time Spent
              </Typography>
              <Typography variant="h3">
                {Math.round(timeSpentTotal / 60)} mins
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Over Time
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line
                data={performanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      title: {
                        display: true,
                        text: 'Score (%)',
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Subject and Topic Performance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance by Subject
            </Typography>
            <Box sx={{ height: 300 }}>
              <Doughnut
                data={subjectData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Questions by Topic
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar
                data={topicData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Questions',
                      },
                    },
                  },
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics; 