import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import ProgressService from '../services/progressService';
import { Achievement } from '../data/achievements';

const Achievements = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<{ userId: string; points: number }[]>([]);
  const progressService = ProgressService.getInstance();

  useEffect(() => {
    if (user) {
      setAchievements(progressService.getAchievements(user.id));
      setLeaderboard(progressService.getLeaderboard());
    }
  }, [user]);

  const calculateProgress = (achievement: Achievement) => {
    const earnedBadges = achievement.badges.filter((badge) => badge.earned).length;
    return (earnedBadges / achievement.badges.length) * 100;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Achievements
      </Typography>

      <Grid container spacing={4}>
        {/* Achievements Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Progress
            </Typography>
            {achievements.map((achievement) => (
              <Box key={achievement.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1">{achievement.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {achievement.points} points
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={calculateProgress(achievement)}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {achievement.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                  {achievement.badges.map((badge) => (
                    <Chip
                      key={badge.id}
                      icon={<span>{badge.icon}</span>}
                      label={badge.name}
                      color={badge.earned ? 'primary' : 'default'}
                      variant={badge.earned ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Leaderboard Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Leaderboard
            </Typography>
            <List>
              {leaderboard.map((entry, index) => (
                <React.Fragment key={entry.userId}>
                  <ListItem>
                    <ListItemIcon>
                      {index === 0 ? (
                        <TrophyIcon sx={{ color: 'gold' }} />
                      ) : index === 1 ? (
                        <TrophyIcon sx={{ color: 'silver' }} />
                      ) : index === 2 ? (
                        <TrophyIcon sx={{ color: '#cd7f32' }} />
                      ) : (
                        <StarIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={entry.userId === user?.id ? 'You' : `User ${index + 1}`}
                      secondary={`${entry.points} points`}
                    />
                  </ListItem>
                  {index < leaderboard.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Achievements; 