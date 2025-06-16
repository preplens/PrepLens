import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const TestConnection = () => {
  const [deviceInfo, setDeviceInfo] = useState<any>({});

  useEffect(() => {
    // Collect device information
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      connection: (navigator as any).connection ? {
        effectiveType: (navigator as any).connection.effectiveType,
        downlink: (navigator as any).connection.downlink,
        rtt: (navigator as any).connection.rtt,
      } : 'Not available',
      timestamp: new Date().toISOString(),
    };
    setDeviceInfo(info);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Connection Test
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Device Information
        </Typography>
        <List>
          {Object.entries(deviceInfo).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText
                primary={key}
                secondary={typeof value === 'object' ? JSON.stringify(value) : String(value)}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default TestConnection; 