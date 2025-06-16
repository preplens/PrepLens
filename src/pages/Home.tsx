import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Avatar,
  AvatarGroup,
  Chip,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  LinearProgress,
  Drawer,
} from '@mui/material';
import {
  School as SchoolIcon,
  Timeline as TimelineIcon,
  Psychology as PsychologyIcon,
  EmojiEvents as EmojiEventsIcon,
  ArrowForward as ArrowForwardIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Star as StarIcon,
  PlayCircle as PlayCircleIcon,
  Book as BookIcon,
  Assignment as AssignmentIcon,
  Groups as GroupsIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Quiz as QuizIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Analytics as AnalyticsIcon,
  Language as LanguageIcon,
  AutoGraph as AutoGraphIcon,
  MilitaryTech as MilitaryTechIcon,
  Speed as SpeedIcon,
  Lightbulb as LightbulbIcon,
  CheckCircle as CheckCircleIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const translations = {
  en: {
    nav: {
      exams: 'Exams',
      courses: 'Courses',
      studyMaterial: 'Study Material',
      getStarted: 'Get Started'
    },
    hero: {
      headline1: "Don't Just Prepare.",
      headline2: "Dominate India's Toughest Government Exams.",
      subheadline: "Join 1.8+ Crore aspirants who trust PrepLens for their success. Get expert-curated questions, AI-powered performance insights, and a competitive edge through smart learning.",
      trustedBy: "Trusted by 1.8+ Crore Students",
      features: {
        mockTests: "Free Mock Tests",
        guidance: "Expert Guidance",
        support: "24/7 Support"
      }
    },
    whyChoose: {
      title: "Why Choose PrepLens?",
      features: {
        analytics: "AI-Powered Performance Analytics",
        questions: "Expert-Curated Question Bank",
        tracking: "Real-time Progress Tracking",
        plans: "Personalized Study Plans"
      }
    }
  },
  hi: {
    nav: {
      exams: 'परीक्षाएं',
      courses: 'कोर्स',
      studyMaterial: 'अध्ययन सामग्री',
      getStarted: 'शुरू करें'
    },
    hero: {
      headline1: "सिर्फ तैयारी नहीं।",
      headline2: "भारत की सबसे कठिन सरकारी परीक्षाओं में विजयी बनें।",
      subheadline: "1.8+ करोड़ उम्मीदवारों के साथ जुड़ें जो अपनी सफलता के लिए PrepLens पर भरोसा करते हैं। विशेषज्ञों द्वारा तैयार प्रश्न, AI-संचालित प्रदर्शन विश्लेषण, और स्मार्ट लर्निंग के माध्यम से प्रतिस्पर्धात्मक बढ़त प्राप्त करें।",
      trustedBy: "1.8+ करोड़ छात्रों द्वारा विश्वसनीय",
      features: {
        mockTests: "मुफ्त मॉक टेस्ट",
        guidance: "विशेषज्ञ मार्गदर्शन",
        support: "24/7 सहायता"
      }
    },
    whyChoose: {
      title: "PrepLens क्यों चुनें?",
      features: {
        analytics: "AI-संचालित प्रदर्शन विश्लेषण",
        questions: "विशेषज्ञों द्वारा तैयार प्रश्न बैंक",
        tracking: "रीयल-टाइम प्रगति ट्रैकिंग",
        plans: "व्यक्तिगत अध्ययन योजनाएं"
      }
    }
  }
};

const features = [
  {
    icon: <QuizIcon sx={{ fontSize: 40 }} />,
    title: 'Curated Questions',
    description: 'Carefully selected questions designed by experts for maximum success rate',
    color: '#1976d2'
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
    title: 'AI-Powered Analytics',
    description: 'Get personalized insights and recommendations based on your performance',
    color: '#2e7d32'
  },
  {
    icon: <MilitaryTechIcon sx={{ fontSize: 40 }} />,
    title: 'Gamified Learning',
    description: 'Earn badges, climb leaderboards, and track your progress with engaging rewards',
    color: '#ed6c02'
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: 'Performance Tracking',
    description: 'Monitor your progress with detailed analytics and improvement suggestions',
    color: '#9c27b0'
  },
  {
    icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
    title: 'Smart Recommendations',
    description: 'Get personalized study plans based on your strengths and weaknesses',
    color: '#d32f2f'
  },
  {
    icon: <AutoGraphIcon sx={{ fontSize: 40 }} />,
    title: 'Success Analytics',
    description: 'Track your percentile rank and compare with top performers',
    color: '#0288d1'
  }
];

const analyticsData = {
  overallScore: 78,
  percentile: 92,
  strengths: [
    { topic: 'Quantitative Aptitude', score: 85 },
    { topic: 'Logical Reasoning', score: 82 },
    { topic: 'General Awareness', score: 75 },
  ],
  weaknesses: [
    { topic: 'English Language', score: 65 },
    { topic: 'Computer Knowledge', score: 68 },
  ],
  recentProgress: [
    { date: 'Week 1', score: 65 },
    { date: 'Week 2', score: 70 },
    { date: 'Week 3', score: 75 },
    { date: 'Week 4', score: 78 },
  ]
};

const gamificationData = {
  badges: [
    { name: 'Quick Learner', icon: '🚀', description: 'Completed 5 tests in a day' },
    { name: 'Consistent', icon: '📈', description: 'Practiced for 7 days straight' },
    { name: 'Top Performer', icon: '🏆', description: 'Scored above 90% in a test' },
  ],
  leaderboard: [
    { rank: 1, name: 'Rahul S.', score: 98, avatar: 'https://i.pravatar.cc/150?img=1' },
    { rank: 2, name: 'Priya P.', score: 96, avatar: 'https://i.pravatar.cc/150?img=2' },
    { rank: 3, name: 'Amit K.', score: 95, avatar: 'https://i.pravatar.cc/150?img=3' },
  ]
};

const testimonials = [
  {
    name: 'Rahul Sharma',
    exam: 'SSC CGL',
    avatar: 'https://i.pravatar.cc/150?img=1',
    text: 'The AI-powered analytics helped me identify my weak areas and improve my score significantly. The curated questions were spot on!',
    score: '98%'
  },
  {
    name: 'Priya Patel',
    exam: 'RRB NTPC',
    avatar: 'https://i.pravatar.cc/150?img=2',
    text: 'The gamification features made studying fun and engaging. I could track my progress and compete with others, which kept me motivated.',
    score: '96%'
  },
  {
    name: 'Amit Kumar',
    exam: 'Banking',
    avatar: 'https://i.pravatar.cc/150?img=3',
    text: 'The personalized recommendations and detailed analytics helped me focus on the right topics. Best platform for government exam preparation!',
    score: '95%'
  }
];

const stats = [
  { number: '1.8+', label: 'Crore Students' },
  { number: '95%', label: 'Success Rate' },
  { number: '50+', label: 'Exam Categories' },
  { number: '24/7', label: 'Support' }
];

const popularExams = [
  { name: 'UPSC', icon: <BookIcon /> },
  { name: 'SSC CGL', icon: <AssignmentIcon /> },
  { name: 'Banking', icon: <GroupsIcon /> },
  { name: 'Railway', icon: <SchoolIcon /> },
  { name: 'Defense', icon: <EmojiEventsIcon /> },
];

const studentAvatars = [
  {
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'UPSC Aspirant'
  },
  {
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'SSC Aspirant'
  },
  {
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
    name: 'Banking Aspirant'
  },
  {
    img: 'https://randomuser.me/api/portraits/women/46.jpg',
    name: 'Railway Aspirant'
  },
  {
    img: 'https://randomuser.me/api/portraits/men/47.jpg',
    name: 'Defense Aspirant'
  }
];

const RRBIcon = () => (
  <img 
    src="https://upload.wikimedia.org/wikipedia/commons/6/61/Indian_Railways_official.jpg"
    alt="RRB Logo"
    style={{
      width: '24px',
      height: '24px',
      objectFit: 'contain',
      borderRadius: '4px'
    }}
  />
);

const SSCIcon = () => (
  <img 
    src="https://cdn1.byjus.com/wp-content/uploads/2020/05/SSC-Full-Form-SSC-Logo.png"
    alt="SSC Logo"
    style={{
      width: '24px',
      height: '24px',
      objectFit: 'contain',
      borderRadius: '4px'
    }}
  />
);

interface ExamOption {
  name: string;
  icon: React.ReactNode;
  options: {
    name: string;
    icon: React.ReactNode;
    path: string;
  }[];
}

const examOptions: ExamOption[] = [
  {
    name: 'SSC CHSL',
    icon: <SSCIcon />,
    options: [
      {
        name: 'Practice',
        icon: <QuizIcon />,
        path: '/practice/ssc-chsl'
      },
      {
        name: 'Test Series',
        icon: <FormatListNumberedIcon />,
        path: '/test-series/ssc-chsl'
      }
    ]
  },
  {
    name: 'SSC CGL',
    icon: <SSCIcon />,
    options: [
      {
        name: 'Practice',
        icon: <QuizIcon />,
        path: '/practice/ssc-cgl'
      },
      {
        name: 'Test Series',
        icon: <FormatListNumberedIcon />,
        path: '/test-series/ssc-cgl'
      }
    ]
  },
  {
    name: 'RRB JE',
    icon: <RRBIcon />,
    options: [
      {
        name: 'Practice',
        icon: <QuizIcon />,
        path: '/practice/rrb-je'
      },
      {
        name: 'Test Series',
        icon: <FormatListNumberedIcon />,
        path: '/test-series/rrb-je'
      }
    ]
  },
  {
    name: 'RRB Loco Pilot',
    icon: <RRBIcon />,
    options: [
      {
        name: 'Practice',
        icon: <QuizIcon />,
        path: '/practice/rrb-loco-pilot'
      },
      {
        name: 'Test Series',
        icon: <FormatListNumberedIcon />,
        path: '/test-series/rrb-loco-pilot'
      }
    ]
  },
  {
    name: 'RRB NTPC (Graduates)',
    icon: <RRBIcon />,
    options: [
      {
        name: 'Practice',
        icon: <QuizIcon />,
        path: '/practice/rrb-ntpc-graduate'
      },
      {
        name: 'Test Series',
        icon: <FormatListNumberedIcon />,
        path: '/test-series/rrb-ntpc-graduate'
      }
    ]
  },
  {
    name: 'RRB NTPC (Non-Graduates)',
    icon: <RRBIcon />,
    options: [
      {
        name: 'Practice',
        icon: <QuizIcon />,
        path: '/practice/rrb-ntpc-non-graduate'
      },
      {
        name: 'Test Series',
        icon: <FormatListNumberedIcon />,
        path: '/test-series/rrb-ntpc-non-graduate'
      }
    ]
  }
];

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [examMenuAnchor, setExamMenuAnchor] = useState<null | HTMLElement>(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isHoveringExam, setIsHoveringExam] = useState(false);
  const [isHoveringSubMenu, setIsHoveringSubMenu] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [currentLang, setCurrentLang] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang as keyof typeof translations];

  const handleNavigation = (path: string) => {
    if (isMobile) {
      window.location.href = path;
    } else {
      navigate(path);
    }
  };

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem('user');
    handleNavigation(isLoggedIn ? '/dashboard' : '/login');
  };

  const clearAllTimeouts = () => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
      subMenuTimeoutRef.current = null;
    }
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsSubMenuOpen(false);
    setExamMenuAnchor(null);
    setSubMenuAnchor(null);
    setSelectedExam(null);
    setIsHoveringExam(false);
    setIsHoveringSubMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target as Node)) {
        closeAllMenus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (languageMenuOpen) {
      setLanguageMenuAnchor(document.getElementById('language-button'));
    } else {
      setLanguageMenuAnchor(null);
    }
  }, [languageMenuOpen]);

  const handleExamMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    clearAllTimeouts();
    setExamMenuAnchor(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleExamMenuClose = () => {
    clearAllTimeouts();
    menuTimeoutRef.current = setTimeout(() => {
      if (!isHoveringExam && !isHoveringSubMenu) {
        closeAllMenus();
      }
    }, 150);
  };

  const handleExamClick = (event: React.MouseEvent<HTMLElement>, exam: string) => {
    event.preventDefault();
    event.stopPropagation();
    clearAllTimeouts();
    setSubMenuAnchor(event.currentTarget);
    setSelectedExam(exam);
    setIsSubMenuOpen(true);
  };

  const handleSubMenuClose = () => {
    clearAllTimeouts();
    subMenuTimeoutRef.current = setTimeout(() => {
      if (!isHoveringExam && !isHoveringSubMenu) {
        setIsSubMenuOpen(false);
        setSubMenuAnchor(null);
        setSelectedExam(null);
      }
    }, 150);
  };

  const handleExamMouseEnter = () => {
    clearAllTimeouts();
    setIsHoveringExam(true);
  };

  const handleExamMouseLeave = () => {
    setIsHoveringExam(false);
    handleExamMenuClose();
  };

  const handleSubMenuMouseEnter = () => {
    clearAllTimeouts();
    setIsHoveringSubMenu(true);
  };

  const handleSubMenuMouseLeave = () => {
    setIsHoveringSubMenu(false);
    handleSubMenuClose();
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setSelectedLanguage(event.target.value);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <Box>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          py: 1,
          px: { xs: 2, sm: 3, md: 4 }
        }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            PrepLens
          </Typography>

          {/* Desktop Navigation */}
          <Stack 
            direction="row" 
            spacing={2} 
            alignItems="center"
            sx={{ 
              display: { xs: 'none', md: 'flex' }
            }}
          >
            <Stack direction="row" spacing={1}>
              <Button
                color="inherit"
                sx={{
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
                  fontWeight: 500
                }}
              >
                {t.nav.exams}
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
                  fontWeight: 500
                }}
              >
                {t.nav.courses}
              </Button>
              <Button
                color="inherit"
                sx={{
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
                  fontWeight: 500
                }}
              >
                {t.nav.studyMaterial}
              </Button>
            </Stack>
            <Box sx={{ position: 'relative' }}>
              <Button
                id="language-button"
                variant="outlined"
                size="small"
                onClick={(event) => {
                  setLanguageMenuAnchor(event.currentTarget);
                  setLanguageMenuOpen(true);
                }}
                sx={{
                  borderColor: 'rgba(0,0,0,0.1)',
                  color: 'text.primary',
                  '&:hover': { borderColor: 'primary.main' },
                  minWidth: '100px',
                  justifyContent: 'space-between',
                  px: 2
                }}
              >
                {selectedLanguage}
                <KeyboardArrowDownIcon />
              </Button>
              <Menu
                anchorEl={languageMenuAnchor}
                open={languageMenuOpen}
                onClose={() => setLanguageMenuOpen(false)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ 
                  mt: 1,
                  '& .MuiPaper-root': {
                    minWidth: '100px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                  }
                }}
              >
                <MenuItem 
                  onClick={() => {
                    setSelectedLanguage('English');
                    setCurrentLang('en');
                    setLanguageMenuOpen(false);
                  }}
                  selected={selectedLanguage === 'English'}
                  sx={{
                    py: 1,
                    px: 2,
                    '&.Mui-selected': {
                      bgcolor: 'rgba(25, 118, 210, 0.08)',
                      '&:hover': {
                        bgcolor: 'rgba(25, 118, 210, 0.12)',
                      }
                    }
                  }}
                >
                  English
                </MenuItem>
                <MenuItem 
                  onClick={() => {
                    setSelectedLanguage('हिंदी');
                    setCurrentLang('hi');
                    setLanguageMenuOpen(false);
                  }}
                  selected={selectedLanguage === 'हिंदी'}
                  sx={{
                    py: 1,
                    px: 2,
                    '&.Mui-selected': {
                      bgcolor: 'rgba(25, 118, 210, 0.08)',
                      '&:hover': {
                        bgcolor: 'rgba(25, 118, 210, 0.12)',
                      }
                    }
                  }}
                >
                  हिंदी
                </MenuItem>
              </Menu>
            </Box>
            <Button
              variant="contained"
              onClick={() => handleNavigation('/register')}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
                px: 3,
                fontWeight: 600
              }}
            >
              {t.nav.getStarted}
            </Button>
          </Stack>

          {/* Mobile Navigation */}
          <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center"
            sx={{ 
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={(event) => {
                  setLanguageMenuAnchor(event.currentTarget);
                  setLanguageMenuOpen(true);
                }}
                sx={{
                  borderColor: 'rgba(0,0,0,0.1)',
                  color: 'text.primary',
                  minWidth: '80px',
                  px: 1
                }}
              >
                {selectedLanguage}
                <KeyboardArrowDownIcon />
              </Button>
            </Box>
            <IconButton
              onClick={() => setMobileMenuOpen(true)}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '300px',
            bgcolor: 'background.paper',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
              Menu
            </Typography>
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Stack spacing={2}>
            <Button
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                py: 1.5,
                color: 'text.primary',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
              }}
            >
              {t.nav.exams}
            </Button>
            <Button
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                py: 1.5,
                color: 'text.primary',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
              }}
            >
              {t.nav.courses}
            </Button>
            <Button
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                py: 1.5,
                color: 'text.primary',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
              }}
            >
              {t.nav.studyMaterial}
            </Button>
            <Divider sx={{ my: 1 }} />
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                handleNavigation('/register');
                setMobileMenuOpen(false);
              }}
              sx={{
                py: 1.5,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
            >
              {t.nav.getStarted}
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                textAlign: { xs: 'center', md: 'left' },
                maxWidth: { md: '600px' }
              }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                    fontWeight: 800,
                    mb: 3,
                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA000 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em'
                  }}
                >
                  {t.hero.headline1}
                  <Box component="span" sx={{ 
                    display: 'block',
                    mt: 1,
                    background: 'linear-gradient(45deg, #FFFFFF 30%, #E3F2FD 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    {t.hero.headline2}
                  </Box>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: 'rgba(255,255,255,0.9)',
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  {t.hero.subheadline}
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleNavigation('/register')}
                    sx={{
                      bgcolor: '#FFD700',
                      color: '#1a237e',
                      '&:hover': {
                        bgcolor: '#FFC107',
                        transform: 'translateY(-2px)',
                      },
                      py: 1.5,
                      px: 4,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      borderRadius: '8px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                        transition: 'transform 0.3s ease',
                      },
                      '&:hover::after': {
                        transform: 'translateX(100%)',
                      }
                    }}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => handleNavigation('/login')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      },
                      py: 1.5,
                      px: 4,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Login
                  </Button>
                </Stack>
                <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    {t.hero.trustedBy}
                  </Typography>
                  <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { borderColor: 'white' } }}>
                    <Avatar src="https://i.pravatar.cc/150?img=1" />
                    <Avatar src="https://i.pravatar.cc/150?img=2" />
                    <Avatar src="https://i.pravatar.cc/150?img=3" />
                    <Avatar src="https://i.pravatar.cc/150?img=4" />
                  </AvatarGroup>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      label={t.hero.features.mockTests}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                    <Chip
                      label={t.hero.features.guidance}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                    <Chip
                      label={t.hero.features.support}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                position: 'relative'
              }}>
                <Box sx={{
                  width: '100%',
                  height: '400px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="h4" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
                    {t.whyChoose.title}
                  </Typography>
                  <Stack spacing={3} sx={{ width: '100%', maxWidth: '400px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        {t.whyChoose.features.analytics}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        {t.whyChoose.features.questions}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        {t.whyChoose.features.tracking}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
                      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                        {t.whyChoose.features.plans}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: { xs: 2, md: 3 },
                    borderRadius: '12px',
                    bgcolor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 1,
                      fontSize: { xs: '2rem', md: '2.5rem' }
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{ 
              mb: { xs: 6, md: 8 }, 
              fontWeight: 700,
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              letterSpacing: '-0.5px'
            }}
          >
            Why Choose PrepLens?
          </Typography>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                        color: feature.color
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{ 
                        mb: 2, 
                        fontWeight: 600,
                        letterSpacing: '-0.5px',
                        fontSize: { xs: '1.25rem', md: '1.5rem' }
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.6,
                        fontSize: { xs: '0.875rem', md: '1rem' }
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Analytics Demo Section */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{ 
              mb: 8, 
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              letterSpacing: '-0.5px'
            }}
          >
            AI-Powered Analytics
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ 
                      mb: 3, 
                      fontWeight: 600,
                      letterSpacing: '-0.5px'
                    }}
                  >
                    Performance Overview
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Overall Score
                      </Typography>
                      <Typography variant="body1" color="primary" sx={{ fontWeight: 600 }}>
                        {analyticsData.overallScore}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={analyticsData.overallScore}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.100',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        }
                      }}
                    />
                  </Box>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Strengths
                    </Typography>
                    {analyticsData.strengths.map((strength, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">{strength.topic}</Typography>
                          <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                            {strength.score}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={strength.score}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'grey.100',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              bgcolor: 'success.main',
                            }
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Areas to Improve
                    </Typography>
                    {analyticsData.weaknesses.map((weakness, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2">{weakness.topic}</Typography>
                          <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
                            {weakness.score}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={weakness.score}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: 'grey.100',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              bgcolor: 'error.main',
                            }
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ 
                      mb: 3, 
                      fontWeight: 600,
                      letterSpacing: '-0.5px'
                    }}
                  >
                    Progress Tracking
                  </Typography>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Weekly Progress
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 200, gap: 2 }}>
                      {analyticsData.recentProgress.map((progress, index) => (
                        <Box
                          key={index}
                          sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              height: `${progress.score}%`,
                              bgcolor: 'primary.main',
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.3s ease',
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {progress.date}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Percentile Rank
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        p: 3,
                        bgcolor: 'grey.50',
                        borderRadius: '12px',
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 700,
                          color: 'primary.main',
                        }}
                      >
                        {analyticsData.percentile}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        Percentile
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Gamification Section */}
      <Box sx={{ py: 12, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{ 
              mb: 8, 
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              letterSpacing: '-0.5px'
            }}
          >
            Gamified Learning Experience
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ 
                      mb: 3, 
                      fontWeight: 600,
                      letterSpacing: '-0.5px'
                    }}
                  >
                    Your Achievements
                  </Typography>
                  <Grid container spacing={2}>
                    {gamificationData.badges.map((badge, index) => (
                      <Grid item xs={12} sm={4} key={index}>
                        <Paper
                          sx={{
                            p: 2,
                            textAlign: 'center',
                            borderRadius: '12px',
                            bgcolor: 'background.paper',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                        >
                          <Typography
                            variant="h3"
                            sx={{ mb: 1 }}
                          >
                            {badge.icon}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600 }}
                          >
                            {badge.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                          >
                            {badge.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{ 
                      mb: 3, 
                      fontWeight: 600,
                      letterSpacing: '-0.5px'
                    }}
                  >
                    Leaderboard
                  </Typography>
                  <Stack spacing={2}>
                    {gamificationData.leaderboard.map((player, index) => (
                      <Paper
                        key={index}
                        sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          borderRadius: '12px',
                          bgcolor: 'background.paper',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            width: 32,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: index === 0 ? 'warning.main' : 'grey.100',
                            color: index === 0 ? 'white' : 'text.primary',
                            borderRadius: '50%',
                            fontWeight: 600,
                          }}
                        >
                          {player.rank}
                        </Typography>
                        <Avatar
                          src={player.avatar}
                          alt={player.name}
                          sx={{ width: 40, height: 40 }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {player.name}
                          </Typography>
                        </Box>
                        <Chip
                          label={`${player.score}%`}
                          color={index === 0 ? 'warning' : 'primary'}
                          sx={{ fontWeight: 600 }}
                        />
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 12, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{ 
              mb: 8, 
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.5rem' },
              letterSpacing: '-0.5px'
            }}
          >
            Success Stories
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{ 
                          width: 64, 
                          height: 64, 
                          mr: 2,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Box>
                        <Typography 
                          variant="h6" 
                          component="h3" 
                          sx={{ 
                            fontWeight: 600,
                            letterSpacing: '-0.5px'
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="primary"
                          sx={{ fontWeight: 500 }}
                        >
                          {testimonial.exam}
                        </Typography>
                      </Box>
                      <Chip
                        label={testimonial.score}
                        color="success"
                        sx={{
                          ml: 'auto',
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.6,
                        fontStyle: 'italic'
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
            pointerEvents: 'none',
          }
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{ 
                mb: 3, 
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.5rem' },
                letterSpacing: '-0.5px'
              }}
            >
              Ready to Start Your Success Story?
            </Typography>
            <Typography
              variant="h5"
              sx={{ 
                mb: 6, 
                opacity: 0.9,
                lineHeight: 1.6
              }}
            >
              Join 1.8+ Crore students who trust PrepLens for their exam preparation
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleNavigation('/register')}
                sx={{
                  bgcolor: '#FFD700',
                  color: '#1a237e',
                  '&:hover': {
                    bgcolor: '#FFC107',
                    transform: 'translateY(-2px)',
                  },
                  py: 1.5,
                  px: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  borderRadius: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
                    transition: 'transform 0.3s ease',
                  },
                  '&:hover::after': {
                    transform: 'translateX(100%)',
                  }
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleNavigation('/login')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  py: 1.5,
                  px: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                }}
              >
                Already a User? Login
              </Button>
            </Stack>
            <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Trusted by 1.8+ Crore Students
              </Typography>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { borderColor: 'white' } }}>
                <Avatar src="https://i.pravatar.cc/150?img=1" />
                <Avatar src="https://i.pravatar.cc/150?img=2" />
                <Avatar src="https://i.pravatar.cc/150?img=3" />
                <Avatar src="https://i.pravatar.cc/150?img=4" />
              </AvatarGroup>
              <Stack direction="row" spacing={1}>
                <Chip
                  label="Free Mock Tests"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
                <Chip
                  label="Expert Guidance"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
                <Chip
                  label="24/7 Support"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    '& .MuiChip-label': { px: 1 },
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 8,
          bgcolor: 'grey.900',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  mb: 3, 
                  fontWeight: 600,
                  letterSpacing: '-0.5px'
                }}
              >
                PrepLens
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  opacity: 0.7,
                  lineHeight: 1.6,
                  mb: 3
                }}
              >
                India's leading platform for government exam preparation.
                Join millions of students in their journey to success.
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  mb: 3, 
                  fontWeight: 600,
                  letterSpacing: '-0.5px'
                }}
              >
                Company
              </Typography>
              <Stack spacing={2}>
                <Box
                  component={Link}
                  to="/about"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.7,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                >
                  About Us
                </Box>
                <Box
                  component={Link}
                  to="/contact"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.7,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                >
                  Contact
                </Box>
                <Box
                  component={Link}
                  to="/careers"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.7,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                >
                  Careers
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  mb: 3, 
                  fontWeight: 600,
                  letterSpacing: '-0.5px'
                }}
              >
                Resources
              </Typography>
              <Stack spacing={2}>
                <Box
                  component={Link}
                  to="/blog"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.7,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                >
                  Blog
                </Box>
                <Box
                  component={Link}
                  to="/faq"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.7,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                >
                  FAQ
                </Box>
                <Box
                  component={Link}
                  to="/privacy"
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.7,
                    transition: 'opacity 0.2s',
                    '&:hover': {
                      opacity: 1
                    }
                  }}
                >
                  Privacy Policy
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  mb: 3, 
                  fontWeight: 600,
                  letterSpacing: '-0.5px'
                }}
              >
                Connect With Us
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton
                  color="inherit"
                  component="a"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  <img src="/facebook.svg" alt="Facebook" style={{ width: 24, height: 24 }} />
                </IconButton>
                <IconButton
                  color="inherit"
                  component="a"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  <img src="/twitter.svg" alt="Twitter" style={{ width: 24, height: 24 }} />
                </IconButton>
                <IconButton
                  color="inherit"
                  component="a"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  <img src="/instagram.svg" alt="Instagram" style={{ width: 24, height: 24 }} />
                </IconButton>
                <IconButton
                  color="inherit"
                  component="a"
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  <img src="/youtube.svg" alt="YouTube" style={{ width: 24, height: 24 }} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © {new Date().getFullYear()} PrepLens. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 